'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { MOCK_ASSESSMENT_QUESTIONS } from '@/lib/mockData/assessmentQuestions';
import { BrainCircuit, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, Award, Zap } from 'lucide-react';

export default function SkillAssessmentPage() {
  const router = useRouter();
  const { student, submitAssessment } = useStudent();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = MOCK_ASSESSMENT_QUESTIONS;
  const currentQ = questions[currentStep];

  const handleSelectOption = (score: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: score
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    submitAssessment(answers);
    setSubmitted(true);
  };

  const progressPercentage = Math.round(((currentStep + 1) / questions.length) * 100);
  const isSelected = answers[currentQ.id] !== undefined;

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        
        {/* Top Header */}
        <div className="enterprise-card rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 px-3 py-1 rounded-full text-xs font-bold text-blue-700 dark:text-blue-300">
              <BrainCircuit className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>AI Assessment Module · AICTE Standard</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Interactive Skill & Placement Assessment</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">12 Multi-domain questions evaluating Technical, Problem Solving, Communication & Digital competencies.</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl text-right shrink-0">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Question Progress</span>
            <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400">{currentStep + 1} / {questions.length}</span>
          </div>
        </div>

        {submitted ? (
          /* Results View */
          <div className="enterprise-card rounded-xl p-8 sm:p-12 text-center space-y-6 shadow-enterprise-modal max-w-3xl mx-auto my-6 animate-fadeIn">
            
            <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-blue-600 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-emerald-500/20">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="status-pill status-pill-green text-xs">
                ✓ Assessment Complete & Verified
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Updated Readiness Score: {student.readinessScore}/100</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Your responses have been processed by the SkillBridge AI Engine. Your skill proficiencies and skill gaps have been dynamically recalculated!
              </p>
            </div>

            <div className="enterprise-row rounded-xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">New Readiness Score</span>
                <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{student.readinessScore} / 100</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Top Strength</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">Python & Problem Solving</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Isolated Skill Gap</span>
                <span className="text-sm font-bold text-rose-600 dark:text-rose-400">TensorFlow / Deep Learning</span>
              </div>
            </div>

            {/* Verified Skills Summary */}
            <div className="text-left bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Verified Technical Credentials ({student.skills.filter(s => s.verified).length} Skills Verified)
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                  Accredited by AI Engine
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {student.skills.filter(s => s.verified).map(s => (
                  <span key={s.id} className="credential-tag text-[10px] py-0.5 px-2">
                    ✓ {s.name} ({s.level}%)
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={() => router.push('/portfolio')}
                className="w-full sm:w-auto enterprise-btn-primary px-6 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>View Verified Portfolio & Badges</span>
              </button>

              <button
                onClick={() => router.push('/skill-gap')}
                className="w-full sm:w-auto enterprise-btn-secondary px-6 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
              >
                <BrainCircuit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Inspect Skill Gap Matrix</span>
              </button>
            </div>

          </div>
        ) : (
          /* Questionnaire Wizard */
          <div className="enterprise-card rounded-xl p-6 sm:p-8 space-y-7 shadow-enterprise-card">
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Category: <strong className="text-blue-700 dark:text-blue-300">{currentQ.category}</strong>
                </span>
                <span className="text-blue-600 dark:text-blue-400">{progressPercentage}% Completed</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Question {currentStep + 1} of {questions.length}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                {currentQ.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const active = answers[currentQ.id] === opt.score;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.score)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-4 ${
                      active
                        ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 text-blue-950 dark:text-blue-100 ring-1 ring-blue-600/50 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        active ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-xs sm:text-sm font-medium leading-relaxed">{opt.label}</span>
                    </div>

                    {active && <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Wizard Controls */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="enterprise-btn-secondary px-4 py-2 rounded-lg text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              {currentStep < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!isSelected}
                  className="enterprise-btn-primary px-5 py-2 rounded-lg text-xs font-semibold disabled:opacity-40 flex items-center gap-2"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isSelected}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg text-xs font-bold shadow-sm transition disabled:opacity-40 flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Submit & Calculate Readiness</span>
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </AppLayout>
  );
}
