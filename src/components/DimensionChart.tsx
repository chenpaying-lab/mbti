import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';

interface DimensionChartProps {
  scores: {
    E: number; I: number;
    S: number; N: number;
    T: number; F: number;
    J: number; P: number;
  };
}

export const DimensionChart: React.FC<DimensionChartProps> = ({ scores }) => {
  const data = [
    { name: 'Energy Source', left: 'E', right: 'I', leftVal: scores.E, rightVal: scores.I, leftColor: '#FFD93D', rightColor: '#6EB9F7' },
    { name: 'Information Intake', left: 'S', right: 'N', leftVal: scores.S, rightVal: scores.N, leftColor: '#FF8400', rightColor: '#A2D5AB' },
    { name: 'Decision Making', left: 'T', right: 'F', leftVal: scores.T, rightVal: scores.F, leftColor: '#FF4B2B', rightColor: '#4E9F3D' },
    { name: 'Lifestyle', left: 'J', right: 'P', leftVal: scores.J, rightVal: scores.P, leftColor: '#6EB9F7', rightColor: '#FFD93D' },
  ].map(d => {
    const total = d.leftVal + d.rightVal;
    const leftPercent = total === 0 ? 50 : Math.round((d.leftVal / total) * 100);
    return { ...d, leftPercent, rightPercent: 100 - leftPercent };
  });

  return (
    <div className="w-full space-y-6">
      {data.map((item) => (
        <div key={item.name} className="space-y-2">
          <div className="flex justify-between text-xs font-black text-gray-500 uppercase tracking-widest px-1">
            <span>{item.name}</span>
          </div>
          <div className="relative h-12 w-full bg-white rounded-xl cartoon-border overflow-hidden flex">
            <div 
              className="h-full transition-all duration-1000 ease-out flex items-center justify-start px-4 border-r-4 border-[#1a1a1a]"
              style={{ width: `${item.leftPercent}%`, backgroundColor: item.leftColor }}
            >
              <span className="text-gray-900 font-black text-sm">{item.left} {item.leftPercent}%</span>
            </div>
            <div 
              className="h-full transition-all duration-1000 ease-out flex items-center justify-end px-4"
              style={{ width: `${item.rightPercent}%`, backgroundColor: item.rightColor }}
            >
              <span className="text-gray-900 font-black text-sm">{item.rightPercent}% {item.right}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
