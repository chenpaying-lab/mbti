import React from 'react';
import { motion } from 'motion/react';
import { mbtiTypes } from '../data/mbtiTypes';
import { DimensionChart } from './DimensionChart';
import { RefreshCw, Share2, Download, Brain } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ResultViewProps {
  type: string;
  scores: {
    E: number; I: number;
    S: number; N: number;
    T: number; F: number;
    J: number; P: number;
  };
  onRestart: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ type, scores, onRestart }) => {
  const personality = mbtiTypes[type];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My MBTI Test Result',
        text: `I am ${type} (${personality.title})! Come and test your personality type!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-3xl mx-auto space-y-8"
    >
      <div className="cartoon-card relative overflow-hidden rotate-1">
        <div className="relative z-10 text-center space-y-6 mb-16">
          <div className="inline-block bg-[#FFD93D] px-6 py-2 rounded-full cartoon-border -rotate-3 animate-bounce">
            <span className="text-gray-900 font-black tracking-widest uppercase text-lg">Your personality type is</span>
          </div>
          <h1 className="text-8xl md:text-[12rem] font-black text-[#6EB9F7] drop-shadow-[8px_8px_0px_#1a1a1a] tracking-tighter leading-none">
            {type}
          </h1>
          <h2 className="text-3xl md:text-5xl font-black text-gray-800 bg-[#FFFBEB] inline-block px-8 py-3 rounded-3xl cartoon-border rotate-2">
            {personality.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start relative z-10">
          <div className="space-y-8">
            <h3 className="text-2xl font-black text-gray-900 bg-[#A2D5AB] inline-block px-6 py-2 rounded-xl cartoon-border -rotate-2">Personality Traits</h3>
            <p className="text-gray-600 leading-relaxed text-xl font-black">
              {personality.description}
            </p>
            <div className="flex flex-wrap gap-4">
              {personality.traits.map((trait, idx) => (
                <span 
                  key={trait} 
                  className={cn(
                    "px-6 py-3 bg-white text-gray-700 rounded-2xl text-base font-black cartoon-border hover:bg-gray-50 transition-colors",
                    idx % 2 === 0 ? "rotate-2" : "-rotate-2"
                  )}
                >
                  #{trait}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-black text-gray-900 bg-[#FF8400] text-white inline-block px-6 py-2 rounded-xl cartoon-border rotate-2">Dimension Ratios</h3>
            <div className="bg-[#FFFBEB] p-8 rounded-[2.5rem] cartoon-border -rotate-1">
              <DimensionChart scores={scores} />
            </div>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t-8 border-dashed border-[#1a1a1a]/10 flex flex-col md:flex-row gap-8 justify-center relative z-10">
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-3 px-10 py-5 bg-white text-gray-700 rounded-3xl font-black text-2xl cartoon-button -rotate-1"
          >
            <RefreshCw size={28} />
            Retake Test
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-3 px-10 py-5 bg-[#FFD93D] text-gray-900 rounded-3xl font-black text-2xl cartoon-button rotate-1"
          >
            <Brain size={28} />
            Back to Start
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-3 px-10 py-5 bg-[#6EB9F7] text-white rounded-3xl font-black text-2xl cartoon-button -rotate-2"
          >
            <Share2 size={28} />
            Share Result
          </button>
        </div>
      </div>

      <div className="bg-[#1a1a1a] text-white rounded-[3rem] p-10 shadow-[12px_12px_0px_#FFD93D] -rotate-1">
        <h4 className="text-[#FFD93D] font-black text-lg uppercase tracking-[0.3em] mb-4">Tips ✨</h4>
        <p className="text-xl font-black leading-relaxed">
          Personality is fluid! While your dominant type is <span className="text-[#6EB9F7] font-black">{type}</span>, you may exhibit different traits in different environments. Stay curious! 🌈
        </p>
      </div>
    </motion.div>
  );
};
