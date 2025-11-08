
import React, { useState } from 'react';
import type { ScheduleItem } from '../types';

interface PlanItemCardProps {
  item: ScheduleItem;
}

export const PlanItemCard: React.FC<PlanItemCardProps> = ({ item }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const milestoneClasses = item.isMilestone 
    ? "border-l-4 border-amber-400" 
    : "border-l-4 border-cyan-500";
    
  const completionClasses = isCompleted
    ? "opacity-50 line-through"
    : "";

  return (
    <div className={`bg-slate-800 rounded-lg shadow-md p-4 flex items-start space-x-4 transition-all duration-300 ${milestoneClasses} ${completionClasses}`}>
      <div className="flex-shrink-0 pt-1">
         <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => setIsCompleted(!isCompleted)}
          className="h-5 w-5 rounded bg-slate-700 border-slate-600 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-baseline">
          <h3 className="font-bold text-lg text-slate-100">{item.topic}</h3>
          <div className="text-xs font-mono text-slate-400 flex items-center space-x-2">
            <span>{item.date}</span>
            <span className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">Day {item.day}</span>
          </div>
        </div>
        <p className="text-slate-300 mt-1">{item.details}</p>
        {item.isMilestone && (
          <div className="mt-2 text-xs font-semibold inline-flex items-center bg-amber-500/10 text-amber-400 px-2 py-1 rounded-full">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            MILESTONE
          </div>
        )}
      </div>
    </div>
  );
};
