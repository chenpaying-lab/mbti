import React from 'react';
import { motion } from 'motion/react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full mb-12">
      <div className="flex justify-between items-end mb-4">
        <div className="bg-white px-4 py-1 rounded-xl cartoon-border -rotate-1">
          <span className="text-2xl font-black text-gray-900">{current}</span>
          <span className="text-gray-400 font-bold ml-1">/ {total}</span>
        </div>
        <div className="bg-[#FF8400] text-white px-3 py-1 rounded-lg cartoon-border rotate-2 text-xs font-black uppercase tracking-widest">
          {percentage}% DONE
        </div>
      </div>
      <div className="h-6 w-full bg-white rounded-full cartoon-border overflow-hidden">
        <motion.div
          className="h-full bg-[#6EB9F7] border-r-4 border-[#1a1a1a]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
