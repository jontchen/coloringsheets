"use client";

import { WizardStep } from "@/types";

const STEPS: { id: WizardStep; label: string; number: number }[] = [
  { id: "configure", label: "Design", number: 1 },
  { id: "preview", label: "Preview", number: 2 },
  { id: "download", label: "Download", number: 3 },
];

interface StepIndicatorProps {
  currentStep: WizardStep;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {STEPS.map((step, i) => {
        const isActive = i === currentIndex;
        const isCompleted = i < currentIndex;

        return (
          <div key={step.id} className="flex items-center gap-2">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                isActive
                  ? "bg-violet-500 text-white scale-105 shadow-lg"
                  : isCompleted
                  ? "bg-green-400 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-xs">
                {isCompleted ? "✓" : step.number}
              </span>
              {step.label}
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-8 h-1 rounded-full ${
                  isCompleted ? "bg-green-400" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
