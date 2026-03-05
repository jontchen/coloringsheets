"use client";

import { GenerationResult, Orientation } from "@/types";

interface PreviewGridProps {
  results: GenerationResult[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  isLoading: boolean;
  orientation: Orientation;
}

export default function PreviewGrid({
  results,
  selectedId,
  onSelect,
  isLoading,
  orientation,
}: PreviewGridProps) {
  const aspect = orientation === "portrait" ? "aspect-[8.5/11]" : "aspect-[11/8.5]";
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-violet-200" />
          <div className="absolute inset-0 rounded-full border-4 border-violet-500 border-t-transparent animate-spin" />
        </div>
        <p className="text-lg font-bold text-violet-600">
          Creating your coloring sheets...
        </p>
        <p className="text-sm text-gray-400 mt-2">
          This may take a moment
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-700 mb-4">
        Pick your favorite variation
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {results.map((result) => (
          <button
            key={result.id}
            onClick={() => onSelect(result.id)}
            className={`rounded-2xl border-3 overflow-hidden transition-all ${
              selectedId === result.id
                ? "border-violet-500 shadow-lg scale-[1.02]"
                : "border-gray-200 hover:border-violet-300"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result.imageUrl}
              alt="Coloring sheet variation"
              className={`w-full ${aspect} object-cover bg-white`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
