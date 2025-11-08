
import React, { useState } from 'react';
import type { Deadline } from '../types';

interface StudyPlanFormProps {
  onGenerate: (subject: string, duration: number, deadlines: Deadline[]) => void;
  isLoading: boolean;
}

export const StudyPlanForm: React.FC<StudyPlanFormProps> = ({ onGenerate, isLoading }) => {
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState(30);
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);

  const handleAddDeadline = () => {
    setDeadlines([...deadlines, { id: Date.now(), topic: '', days: 1 }]);
  };

  const handleDeadlineChange = <T extends keyof Deadline>(index: number, field: T, value: Deadline[T]) => {
    const newDeadlines = [...deadlines];
    newDeadlines[index][field] = value;
    setDeadlines(newDeadlines);
  };

  const handleRemoveDeadline = (id: number) => {
    setDeadlines(deadlines.filter(d => d.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subject && duration > 0) {
      onGenerate(subject, duration, deadlines);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-1">
          What do you want to study?
        </label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g., 'React and TypeScript for web development'"
          className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          required
        />
      </div>

      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-slate-300 mb-1">
          How many days do you have?
        </label>
        <input
          type="number"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value, 10)))}
          className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          min="1"
          required
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-300">Optional Milestones/Deadlines</h3>
        {deadlines.map((deadline, index) => (
          <div key={deadline.id} className="flex items-center space-x-2 p-2 bg-slate-700/50 rounded-md">
            <input
              type="text"
              placeholder="Milestone (e.g., 'Deploy first app')"
              value={deadline.topic}
              onChange={(e) => handleDeadlineChange(index, 'topic', e.target.value)}
              className="flex-grow bg-slate-600 border border-slate-500 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <span className="text-sm text-slate-400">by day</span>
            <input
              type="number"
              value={deadline.days}
              onChange={(e) => handleDeadlineChange(index, 'days', Math.max(1, parseInt(e.target.value, 10)))}
              className="w-20 bg-slate-600 border border-slate-500 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
              min="1"
              max={duration}
            />
            <button
              type="button"
              onClick={() => handleRemoveDeadline(deadline.id)}
              className="text-slate-400 hover:text-red-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddDeadline}
          className="text-sm text-cyan-400 hover:text-cyan-300 font-medium"
        >
          + Add a milestone
        </button>
      </div>
      
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading || !subject}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isLoading ? 'Generating...' : 'Create My Study Plan'}
        </button>
      </div>
    </form>
  );
};
