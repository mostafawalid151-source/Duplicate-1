import React, { useState } from "react";
import { StudyPlanForm } from "./components/StudyPlanForm";
import { StudyPlanDisplay } from "./components/StudyPlanDisplay";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ErrorDisplay } from "./components/ErrorDisplay";
import { generateStudyPlan } from "./src/services/geminiService";
import type { StudyPlan, Deadline } from "./types";

const App: React.FC = () => {
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePlan = async (
    subject: string,
    duration: number,
    deadlines: Deadline[]
  ) => {
    setIsLoading(true);
    setError(null);
    setStudyPlan(null);

    try {
      const plan = await generateStudyPlan(subject, duration, deadlines);

      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 1);

      const planWithDates = {
        ...plan,
        schedule: plan.schedule.map((item) => {
          const itemDate = new Date(startDate.getTime());
          itemDate.setDate(itemDate.getDate() + item.day - 1);
          return {
            ...item,
            date: itemDate.toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
          };
        }),
      };

      setStudyPlan(planWithDates);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "An unknown error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
            Planora
          </h1>
          <p className="mt-2 text-slate-400">
            Transform your learning goals into an actionable, AI-powered
            schedule.
          </p>
        </header>

        <main>
          <div className="bg-slate-800/50 rounded-xl shadow-lg backdrop-blur-sm p-6 mb-8 border border-slate-700">
            <StudyPlanForm onGenerate={handleGeneratePlan} isLoading={isLoading} />
          </div>

          {isLoading && <LoadingSpinner />}
          {error && <ErrorDisplay message={error} />}
          {studyPlan && !isLoading && <StudyPlanDisplay plan={studyPlan} />}
        </main>

        <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
