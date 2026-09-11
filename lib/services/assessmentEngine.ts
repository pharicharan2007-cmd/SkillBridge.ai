import { supabase } from '../supabase/client';
import { TargetRole, SkillScore, AssessmentAnswer, AssessmentQuestion } from '@/types';

// Constants for Integrity Tracking
const MAX_TIME_PER_QUESTION_MS = 120000; // 2 minutes
const MIN_TIME_PER_QUESTION_MS = 2000; // 2 seconds (suspiciously fast)
const MAX_TAB_SWITCHES = 3;

/**
 * Evaluates a phase of the assessment (e.g., baseline, role_specific).
 * Returns the score percentage (0-100).
 */
export const evaluatePhase = (answers: AssessmentAnswer[], questions: AssessmentQuestion[]): number => {
    if (!answers.length || !questions.length) return 0;
    let totalPoints = 0;
    let earnedPoints = 0;

    answers.forEach(answer => {
        const question = questions.find(q => q.id === answer.question_id);
        if (question) {
            totalPoints += question.points || 1;
            if (answer.is_correct) {
                earnedPoints += question.points || 1;
            }
        }
    });

    return totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
};

/**
 * Evaluates skill scores based on assessment answers.
 * Returns a map of skill_name to score (0-100).
 */
export const extractSkillScores = (answers: AssessmentAnswer[], questions: AssessmentQuestion[]): Record<string, number> => {
    const skillPoints: Record<string, { earned: number; total: number }> = {};

    answers.forEach(answer => {
        const question = questions.find(q => q.id === answer.question_id);
        if (question && question.metadata?.skill) {
            const skill = question.metadata.skill;
            if (!skillPoints[skill]) skillPoints[skill] = { earned: 0, total: 0 };
            
            skillPoints[skill].total += question.points || 1;
            if (answer.is_correct) {
                skillPoints[skill].earned += question.points || 1;
            }
        }
    });

    const scores: Record<string, number> = {};
    for (const [skill, pts] of Object.entries(skillPoints)) {
        scores[skill] = (pts.earned / pts.total) * 100;
    }
    return scores;
};

/**
 * Computes cross-validated skill score based on assessment performance and uploaded credentials.
 * If verified documents support the skill, it boosts the baseline assessment score.
 */
export const calculateCrossValidation = (assessmentScore: number, documentBoost: number = 0): { score: number, status: string } => {
    // Simple algorithm: max out at 100.
    const finalScore = Math.min(100, assessmentScore + documentBoost);
    const status = documentBoost > 0 ? 'cross_validated' : 'auto_verified';
    return { score: finalScore, status };
};

/**
 * Updates the student's readiness score in the database.
 * The score is a weighted average of cross-validated skills against target role requirements.
 */
export const updateStudentReadinessScore = async (studentId: string, targetRoleId?: string): Promise<number> => {
    try {
        // Fetch all verified skill scores for the student
        const { data: scores, error: scoresError } = await supabase
            .from('skill_scores')
            .select('*')
            .eq('student_id', studentId)
            .in('verification_status', ['auto_verified', 'cross_validated']);
        
        if (scoresError) throw scoresError;

        let readinessScore = 0;

        if (!targetRoleId) {
            // Unweighted average if no target role
            if (scores && scores.length > 0) {
                readinessScore = scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length;
            }
        } else {
            // Weighted average based on target role requirements
            const { data: role, error: roleError } = await supabase
                .from('target_roles')
                .select('required_skills')
                .eq('id', targetRoleId)
                .single();

            if (roleError) throw roleError;
            
            const reqSkills = (role.required_skills as Record<string, number>) || {};
            let totalWeight = 0;
            let weightedScoreSum = 0;

            for (const [skillName, requiredLevel] of Object.entries(reqSkills)) {
                // We use requiredLevel as weight. E.g. required 80 means it's heavily weighted.
                const weight = requiredLevel;
                totalWeight += weight;

                const studentSkill = scores?.find(s => s.skill_name === skillName);
                if (studentSkill) {
                     // How close are they to the required level? (Capped at 100% of requirement)
                     const coverage = Math.min(100, (studentSkill.score / requiredLevel) * 100);
                     weightedScoreSum += (coverage * weight);
                }
            }
            
            readinessScore = totalWeight > 0 ? (weightedScoreSum / totalWeight) : 0;
        }

        // Round to 1 decimal place
        readinessScore = Math.round(readinessScore * 10) / 10;

        // Update the student profile
        const { error: updateError } = await supabase
            .from('students')
            .update({ readiness_score: readinessScore })
            .eq('id', studentId);
            
        if (updateError) throw updateError;

        return readinessScore;

    } catch (error) {
        console.error("Error updating readiness score:", error);
        return 0;
    }
};

/**
 * Tracks integrity signals from the frontend context.
 */
export const trackIntegritySignals = (attemptId: string, tabSwitches: number, answers: AssessmentAnswer[]): any => {
    let suspiciouslyFastAnswers = 0;
    
    answers.forEach(ans => {
        if (ans.time_spent_ms < MIN_TIME_PER_QUESTION_MS) {
            suspiciouslyFastAnswers++;
        }
    });

    return {
        tab_switches: tabSwitches,
        suspiciously_fast_answers: suspiciouslyFastAnswers,
        flagged: tabSwitches >= MAX_TAB_SWITCHES || suspiciouslyFastAnswers >= 3
    };
};

/**
 * Audits assessment completion immutably.
 */
export const auditAssessmentCompletion = async (attemptId: string, finalScore: number, verificationStatus: string, integrityFlags: any): Promise<void> => {
    try {
        await supabase
            .from('assessment_audit_log')
            .insert({
                attempt_id: attemptId,
                final_score: finalScore,
                verification_status: verificationStatus,
                integrity_flags: integrityFlags,
                timestamp: new Date().toISOString()
            });
    } catch (error) {
        console.error("Failed to audit assessment completion:", error);
    }
};
