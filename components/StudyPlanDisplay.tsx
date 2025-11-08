
import React from 'react';
import type { StudyPlan } from '../types';
import { PlanItemCard } from './PlanItemCard';

interface StudyPlanDisplayProps {
  plan: StudyPlan;
}

export const StudyPlanDisplay: React.FC<StudyPlanDisplayProps> = ({ plan }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-200">{plan.planTitle}</h2>
      <div className="space-y-4">
        {plan.schedule.map((item) => (
          <PlanItemCard key={item.day} item={item} />
        ))}
      </div>
    </div>
  );
};
