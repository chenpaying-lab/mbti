/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { questions } from './data/questions';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { ResultView } from './components/ResultView';
import { ChevronLeft, Brain, Sparkles, ArrowRight } from 'lucide-react';

const STORAGE_KEY = 'mbti_test_progress_likert';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  // Load progress
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed.index === 'number' && parsed.ans) {
          // Don't auto-set index to skip cover, just load answers
          setAnswers(parsed.ans);
          // If they were at the end, maybe they finished
          if (parsed.index >= questions.length - 1 && Object.keys(parsed.ans).length === questions.length) {
            setIsFinished(true);
          }
        }
      } catch (e) {
        console.error('Failed to load progress', e);
      }
    }
  }, []);

  // Save progress
  useEffect(() => {
    if (currentIndex !== null && !isFinished) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ index: currentIndex, ans: answers }));
    }
  }, [currentIndex, answers, isFinished]);

  const handleSelect = (score: number) => {
    if (currentIndex === null) return;
    
    const newAnswers = { ...answers, [questions[currentIndex].id]: score };
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
    } else {
      setTimeout(() => setIsFinished(true), 500);
    }
  };

  const handleBack = () => {
    if (currentIndex !== null && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRestart = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
  };

  const scores = useMemo(() => {
    const s = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    Object.entries(answers).forEach(([id, score]) => {
      const qId = parseInt(id);
      const q = questions.find(q => q.id === qId);
      if (q) {
        if (score === 5) s[q.dimensionA] += 2;
        else if (score === 4) s[q.dimensionA] += 1;
        else if (score === 2) s[q.dimensionB] += 1;
        else if (score === 1) s[q.dimensionB] += 2;
      }
    });
    return s;
  }, [answers]);

  const mbtiType = useMemo(() => {
    const e_i = scores.E >= scores.I ? 'E' : 'I';
    const s_n = scores.S >= scores.N ? 'S' : 'N';
    const t_f = scores.T >= scores.F ? 'T' : 'F';
    const j_p = scores.J >= scores.P ? 'J' : 'P';
    return `${e_i}${s_n}${t_f}${j_p}`;
  }, [scores]);

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
        <ResultView type={mbtiType} scores={scores} onRestart={handleRestart} />
      </div>
    );
  }

  if (currentIndex === null) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          className="cartoon-card max-w-2xl w-full text-center text-gray-900 animate-wiggle"
        >
          <div className="relative mb-12">
            <div className="w-full h-56 md:h-72 bg-[#FFD93D] cartoon-border rounded-[3rem] overflow-hidden rotate-2 flex items-center justify-center">
              <div className="w-32 h-32 bg-white cartoon-border rounded-[2rem] flex items-center justify-center -rotate-12 shadow-2xl">
                <Brain size={64} className="text-[#FFD93D]" />
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#FFD93D] cartoon-border rounded-full flex items-center justify-center rotate-12 animate-bounce">
              <Sparkles size={32} className="text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#A2D5AB] cartoon-border rounded-xl flex items-center justify-center -rotate-12">
              <Sparkles size={24} className="text-white" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight uppercase leading-none drop-shadow-[4px_4px_0px_#FFD93D]">
            MBTI <br /> <span className="text-[#6EB9F7]">Personality</span> <br /> Test
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed font-black bg-[#FFFBEB] inline-block px-6 py-3 rounded-2xl cartoon-border -rotate-1">
            Discover the real you! ✨
          </p>

          <div className="space-y-6">
            {Object.keys(answers).length > 0 ? (
              <div className="flex flex-col gap-6">
                <button
                  onClick={() => {
                    const saved = localStorage.getItem(STORAGE_KEY);
                    if (saved) {
                      const parsed = JSON.parse(saved);
                      setCurrentIndex(parsed.index);
                    } else {
                      setCurrentIndex(0);
                    }
                  }}
                  className="w-full py-6 bg-[#6EB9F7] text-white rounded-3xl font-black text-3xl cartoon-button flex items-center justify-center gap-4 hover:scale-105 transition-transform"
                >
                  Continue Test
                  <ArrowRight size={32} />
                </button>
                <button
                  onClick={handleRestart}
                  className="w-full py-4 bg-white text-gray-400 rounded-2xl font-black text-xl cartoon-border flex items-center justify-center gap-3 hover:text-red-500 hover:border-red-500 transition-all"
                >
                  Restart Test
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentIndex(0)}
                className="w-full py-6 bg-[#FF8400] text-white rounded-3xl font-black text-3xl cartoon-button flex items-center justify-center gap-4 hover:scale-105 transition-transform"
              >
                Start Test
                <ArrowRight size={32} />
              </button>
            )}
            <div className="flex items-center justify-center gap-2 text-gray-400 font-black uppercase tracking-widest text-sm">
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
              93 Questions
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
              15 Minutes
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 md:py-12">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="p-4 rounded-3xl bg-white cartoon-border text-gray-400 hover:text-[#6EB9F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cartoon-button"
          >
            <ChevronLeft size={28} />
          </button>
          
          <button
            onClick={() => setCurrentIndex(null)}
            className="p-4 rounded-3xl bg-white cartoon-border text-gray-400 hover:text-[#FFD93D] transition-colors cartoon-button animate-wiggle"
          >
            <Brain size={28} />
          </button>
          
          <div className="flex items-center gap-3 bg-white px-8 py-3 rounded-full cartoon-border -rotate-2">
            <Sparkles className="text-[#FFD93D] animate-pulse" size={28} />
            <span className="font-black text-3xl tracking-tighter text-gray-900">MBTI.FUN</span>
          </div>

          <div className="w-12 hidden md:block" /> 
        </header>

        <ProgressBar current={currentIndex + 1} total={questions.length} />

        <QuestionCard
          question={questions[currentIndex]}
          onSelect={handleSelect}
          selectedScore={answers[questions[currentIndex].id]}
        />

        <footer className="mt-16 text-center">
          <div className="inline-block bg-white px-6 py-3 rounded-2xl cartoon-border rotate-2">
            <p className="text-gray-500 text-lg font-black uppercase tracking-wide">
              Be true to yourself! 🌈
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
