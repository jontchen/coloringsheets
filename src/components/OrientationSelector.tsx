"use client";

import { Orientation } from "@/types";

interface OrientationSelectorProps {
  value: Orientation;
  onChange: (orientation: Orientation) => void;
}

export default function OrientationSelector({
  value,
  onChange,
}: OrientationSelectorProps) {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-700 mb-3">Orientation</h3>
      <div className="flex gap-3">
        <button
          onClick={() => onChange("portrait")}
          className={`flex-1 p-4 rounded-2xl border-3 transition-all font-bold text-center flex flex-col items-center gap-2 ${
            value === "portrait"
              ? "border-violet-500 bg-violet-50 text-violet-700 shadow-md scale-[1.02]"
              : "border-gray-200 bg-white text-gray-600 hover:border-violet-300 hover:bg-violet-50/50"
          }`}
        >
          <svg viewBox="0 0 40 56" className="w-8 h-11">
            <rect
              x="2"
              y="2"
              width="36"
              height="52"
              rx="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <line x1="10" y1="14" x2="30" y2="14" stroke="currentColor" strokeWidth="2" opacity="0.4" />
            <line x1="10" y1="22" x2="30" y2="22" stroke="currentColor" strokeWidth="2" opacity="0.4" />
            <line x1="10" y1="30" x2="24" y2="30" stroke="currentColor" strokeWidth="2" opacity="0.4" />
          </svg>
          <span className="text-sm">Portrait</span>
        </button>
        <button
          onClick={() => onChange("landscape")}
          className={`flex-1 p-4 rounded-2xl border-3 transition-all font-bold text-center flex flex-col items-center gap-2 ${
            value === "landscape"
              ? "border-violet-500 bg-violet-50 text-violet-700 shadow-md scale-[1.02]"
              : "border-gray-200 bg-white text-gray-600 hover:border-violet-300 hover:bg-violet-50/50"
          }`}
        >
          <svg viewBox="0 0 56 40" className="w-11 h-8">
            <rect
              x="2"
              y="2"
              width="52"
              height="36"
              rx="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <line x1="10" y1="12" x2="46" y2="12" stroke="currentColor" strokeWidth="2" opacity="0.4" />
            <line x1="10" y1="20" x2="46" y2="20" stroke="currentColor" strokeWidth="2" opacity="0.4" />
            <line x1="10" y1="28" x2="36" y2="28" stroke="currentColor" strokeWidth="2" opacity="0.4" />
          </svg>
          <span className="text-sm">Landscape</span>
        </button>
      </div>
    </div>
  );
}
