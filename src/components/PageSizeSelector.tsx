"use client";

import { PageSize } from "@/types";

interface PageSizeSelectorProps {
  value: PageSize;
  onChange: (size: PageSize) => void;
}

const OPTIONS: { id: PageSize; label: string; dimensions: string }[] = [
  { id: "letter", label: "US Letter", dimensions: '8.5" x 11"' },
  { id: "a4", label: "A4", dimensions: "210 x 297mm" },
];

export default function PageSizeSelector({
  value,
  onChange,
}: PageSizeSelectorProps) {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-700 mb-3">Page Size</h3>
      <div className="flex gap-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`flex-1 p-4 rounded-2xl border-3 transition-all font-bold text-center ${
              value === opt.id
                ? "border-violet-500 bg-violet-50 text-violet-700 shadow-md scale-[1.02]"
                : "border-gray-200 bg-white text-gray-600 hover:border-violet-300 hover:bg-violet-50/50"
            }`}
          >
            <div className="text-base">{opt.label}</div>
            <div className="text-xs font-normal text-gray-400 mt-1">
              {opt.dimensions}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
