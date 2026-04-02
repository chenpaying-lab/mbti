import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../data/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface QuestionCardProps {
  question: Question;
  onSelect: (score: number) => void;
  selectedScore?: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onSelect, selectedScore }) => {
  const options = [
    { label: 'Strongly Disagree', score: 1, color: 'bg-[#FF4B2B]' },
    { label: 'Disagree', score: 2, color: 'bg-[#FF8400]' },
    { label: 'Neutral', score: 3, color: 'bg-[#FFD93D]' },
    { label: 'Agree', score: 4, color: 'bg-[#A2D5AB]' },
    { label: 'Strongly Agree', score: 5, color: 'bg-[#4E9F3D]' },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="cartoon-card max-w-2xl mx-auto -rotate-1">
          <div className="mb-12 text-center">
            <div className="inline-block px-6 py-2 rounded-full bg-[#6EB9F7] text-white text-lg font-black mb-6 cartoon-border -rotate-3 animate-pulse">
              QUESTION #{question.id}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              {question.statement}
            </h2>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 relative">
            {options.map((opt, idx) => (
              <button
                key={opt.score}
                onClick={() => onSelect(opt.score)}
                className={cn(
                  "flex flex-col items-center group w-full md:w-auto transition-transform hover:scale-110",
                  idx % 2 === 0 ? "rotate-1" : "-rotate-1"
                )}
              >
                <div className={cn(
                  "w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-200 border-4 border-[#1a1a1a]",
                  selectedScore === opt.score
                    ? `${opt.color} shadow-[6px_6px_0px_#1a1a1a] scale-110`
                    : "bg-white group-hover:bg-gray-50 shadow-[4px_4px_0px_#1a1a1a]"
                )}>
                  {selectedScore === opt.score && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-white rounded-full border-4 border-[#1a1a1a]" 
                    />
                  )}
                </div>
                <span className={cn(
                  "text-sm font-black mt-4 transition-colors uppercase tracking-widest",
                  selectedScore === opt.score ? "text-gray-900" : "text-gray-400 group-hover:text-gray-600"
                )}>
                  {opt.label}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-16 flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-4">
            <span className="bg-red-50 px-3 py-1 rounded-xl cartoon-border -rotate-2">DISAGREE</span>
            <span className="bg-gray-50 px-3 py-1 rounded-xl cartoon-border rotate-1">NEUTRAL</span>
            <span className="bg-green-50 px-3 py-1 rounded-xl cartoon-border -rotate-1">AGREE</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
