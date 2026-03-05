"use client";

import { useState } from "react";

interface DebugInfo {
  prompt: string;
  imageCount: number;
  costPerImage: number;
  totalCost: number;
  durationMs: number;
}

interface DebugPanelProps {
  info: DebugInfo | null;
}

const COST_PER_IMAGE = 0.003;

export function buildDebugInfo(
  prompt: string,
  imageCount: number,
  durationMs: number
): DebugInfo {
  return {
    prompt,
    imageCount,
    costPerImage: COST_PER_IMAGE,
    totalCost: imageCount * COST_PER_IMAGE,
    durationMs,
  };
}

export default function DebugPanel({ info }: DebugPanelProps) {
  const [expanded, setExpanded] = useState(false);

  if (!info) return null;

  return (
    <div className="mt-6 border-2 border-dashed border-amber-400 bg-amber-50 rounded-2xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center justify-between text-left"
      >
        <span className="text-sm font-bold text-amber-700">
          DEV DEBUG — Est. Cost: ${info.totalCost.toFixed(4)} | {(info.durationMs / 1000).toFixed(1)}s | {info.imageCount} image(s)
        </span>
        <span className="text-amber-500 text-xs font-bold">
          {expanded ? "COLLAPSE" : "EXPAND"}
        </span>
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          <div>
            <div className="text-xs font-bold text-amber-600 mb-1">COST BREAKDOWN</div>
            <div className="text-xs text-amber-800 font-mono bg-amber-100 p-2 rounded-lg">
              {info.imageCount} images x ${info.costPerImage.toFixed(4)}/image = ${info.totalCost.toFixed(4)}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-amber-600 mb-1">PROMPT SENT TO AI</div>
            <div className="text-xs text-amber-800 font-mono bg-amber-100 p-3 rounded-lg whitespace-pre-wrap break-words max-h-48 overflow-y-auto">
              {info.prompt}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-amber-600 mb-1">MODEL</div>
            <div className="text-xs text-amber-800 font-mono bg-amber-100 p-2 rounded-lg">
              black-forest-labs/flux-schnell via Replicate
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
