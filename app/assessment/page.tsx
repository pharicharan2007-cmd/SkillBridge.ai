'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { useStudent } from '@/lib/context/StudentContext';
import { MOCK_ASSESSMENT_QUESTIONS } from '@/lib/mockData/assessmentQuestions';
import { BrainCircuit, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, Award, ShieldCheck, Zap } from 'lucide-react';

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
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-indigo-950 border border-indigo-800 px-3 py-1 rounded-full text-xs font-bold text-indigo-300">
            <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Assessment Module</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Interactive Skill & Placement Assessment</h1>
          <p className="text-xs text-slate-400">12 Multi-domain questions evaluating Technical, Problem Solving, Communication & Digital competencies.</p>
        </div>

        <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-2xl text-right shrink-0">
          <span className="text-xs font-semibold text-slate-400 block">Question Progress</span>
          <span className="text-lg font-extrabold text-indigo-400">{currentStep + 1} / {questions.length}</span>
        </div>
      </div>

      {submitted ? (
        /* Results View */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl max-w-3xl mx-auto my-6 animate-fadeIn">
          
          <div className="w-20 h-20 bg-gradient-to-tr from-emerald-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto text-white shadow-xl shadow-emerald-500/20 animate-bounce">
            <Sparkles className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-4 py-1.5 rounded-full text-xs font-bold inline-block">
              ✓ Assessment Complete & Verified
            </span>
            <h2 className="text-3xl font-black text-white">Updated Readiness Score: {student.readinessScore}/100</h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your responses have been processed by the SkillBridge AI Engine. Your skill proficiencies and skill gaps have been dynamically recalculated!
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div>
              <span className="text-xs text-slate-400 block">New Readiness Score</span>
              <span className="text-2xl font-extrabold text-indigo-400">{student.readinessScore} / 100</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Top Strength</span>
              <span className="text-sm font-bold text-white">Python & Problem Solving</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Isolated Skill Gap</span>
              <span className="text-sm font-bold text-rose-400">TensorFlow / Deep Learning</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => router.push('/profile')}
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-3 rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 hover:scale-105 transition flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>View Updated Skill Profile</span>
            </button>

            <button
              onClick={() => router.push('/skill-gap')}
              className="w-full sm:w-auto bg-slate-800 text-slate-200 border border-slate-700 px-6 py-3 rounded-xl text-xs font-semibold hover:bg-slate-700 transition flex items-center justify-center gap-2"
            >
              <BrainCircuit className="w-4 h-4 text-indigo-400" />
              <span>Inspect Skill Gap Analysis</span>
            </button>
          </div>

        </div>
      ) : (
        /* Questionnaire Wizard */
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-xl max-w-4xl mx-auto">
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Category: <strong className="text-indigo-300">{currentQ.category}</strong>
              </span>
              <span className="text-indigo-400">{progressPercentage}% Completed</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Question {currentStep + 1}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const active = answers[currentQ.id] === opt.score;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.score)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 ${
                    active
                      ? 'bg-gradient-to-r from-indigo-950 to-slate-900 border-indigo-500 ring-2 ring-indigo-500/50 text-white shadow-lg'
                      : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      active ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed">{opt.label}</span>
                  </div>

                  {active && <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Wizard Controls */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep < questions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!isSelected}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30 transition hover:scale-105 disabled:opacity-40 flex items-center gap-2"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isSelected}
                className="bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white px-8 py-2.5 rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-600/30 transition hover:scale-105 disabled:opacity-40 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Submit & Calculate Readiness</span>
              </button>
            )}
          </div>

        </div>
      )}

    </AppLayout>
  );
}
