"use client";

import { SheetStyle } from "@/types";
import { STYLES } from "@/data/styles";

interface StyleSelectorProps {
  value: SheetStyle;
  onChange: (style: SheetStyle) => void;
}

function StylePreview({ id }: { id: SheetStyle }) {
  const cls = "w-full h-full";
  switch (id) {
    case "simple":
      return (
        <svg viewBox="0 0 80 80" className={cls}>
          {/* Simple star and circle - bold, minimal */}
          <circle cx="40" cy="44" r="20" fill="none" stroke="currentColor" strokeWidth="3.5" />
          <circle cx="40" cy="38" r="6" fill="none" stroke="currentColor" strokeWidth="3.5" />
          <rect x="18" y="62" width="44" height="10" rx="5" fill="none" stroke="currentColor" strokeWidth="3.5" />
        </svg>
      );
    case "cartoon":
      return (
        <svg viewBox="0 0 80 80" className={cls}>
          {/* Cartoon face */}
          <circle cx="40" cy="42" r="22" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="32" cy="37" r="4" fill="currentColor" />
          <circle cx="48" cy="37" r="4" fill="currentColor" />
          <path d="M30 50 Q40 60 50 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M22 25 Q28 18 34 25" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M46 25 Q52 18 58 25" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "realistic":
      return (
        <svg viewBox="0 0 80 80" className={cls}>
          {/* Realistic leaf with veins */}
          <path d="M40 12 Q58 30 54 52 Q48 66 40 70 Q32 66 26 52 Q22 30 40 12Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M40 18 L40 65" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M40 30 L50 24" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M40 38 L52 34" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M40 46 L50 44" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M40 30 L30 24" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M40 38 L28 34" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M40 46 L30 44" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M40 54 L34 52" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M40 54 L46 52" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    case "mandala":
      return (
        <svg viewBox="0 0 80 80" className={cls}>
          {/* Mandala pattern */}
          <circle cx="40" cy="40" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="40" cy="40" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="40" cy="40" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="40" cy="40" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1="40"
              y1="40"
              x2={40 + 28 * Math.cos((angle * Math.PI) / 180)}
              y2={40 + 28 * Math.sin((angle * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}
          {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
            <circle
              key={angle}
              cx={40 + 16 * Math.cos((angle * Math.PI) / 180)}
              cy={40 + 16 * Math.sin((angle * Math.PI) / 180)}
              r="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}
        </svg>
      );
    case "zentangle":
      return (
        <svg viewBox="0 0 80 80" className={cls}>
          {/* Zentangle abstract patterns */}
          <rect x="10" y="10" width="60" height="60" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 35 L70 35" stroke="currentColor" strokeWidth="1" />
          <path d="M10 55 L70 55" stroke="currentColor" strokeWidth="1" />
          <path d="M35 10 L35 35" stroke="currentColor" strokeWidth="1" />
          {/* Top-left: parallel curves */}
          <path d="M12 13 Q23 25 33 13" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M12 19 Q23 29 33 19" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M12 25 Q23 33 33 25" fill="none" stroke="currentColor" strokeWidth="1" />
          {/* Top-right: circles */}
          <circle cx="44" cy="19" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="53" cy="24" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="62" cy="17" r="3.5" fill="none" stroke="currentColor" strokeWidth="1" />
          {/* Middle: cross-hatch */}
          <path d="M12 37 L33 53 M12 53 L33 37 M22 37 L22 53" fill="none" stroke="currentColor" strokeWidth="1" />
          {/* Middle-right: dots */}
          {[40, 48, 56, 64].map((x) =>
            [40, 47].map((y) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="currentColor" />
            ))
          )}
          {/* Bottom: zigzag */}
          <path d="M12 58 L20 67 L28 58 L36 67 L44 58 L52 67 L60 58 L68 67" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "stained-glass":
      return (
        <svg viewBox="0 0 80 80" className={cls}>
          {/* Stained glass segments */}
          <rect x="8" y="8" width="64" height="64" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M8 40 L72 40" stroke="currentColor" strokeWidth="2.5" />
          <path d="M40 8 L40 72" stroke="currentColor" strokeWidth="2.5" />
          <path d="M8 8 L40 40" stroke="currentColor" strokeWidth="2.5" />
          <path d="M72 8 L40 40" stroke="currentColor" strokeWidth="2.5" />
          <path d="M8 72 L40 40" stroke="currentColor" strokeWidth="2.5" />
          <path d="M72 72 L40 40" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="40" cy="40" r="10" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="24" cy="24" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="56" cy="24" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="24" cy="56" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="56" cy="56" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
  }
}

export default function StyleSelector({
  value,
  onChange,
}: StyleSelectorProps) {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-700 mb-3">Style</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onChange(style.id)}
            className={`p-4 rounded-2xl border-3 transition-all text-left ${
              value === style.id
                ? "border-violet-500 bg-violet-50 shadow-md scale-[1.02]"
                : "border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50/50"
            }`}
          >
            <div className={`w-16 h-16 mb-2 ${
              value === style.id ? "text-violet-500" : "text-gray-400"
            }`}>
              <StylePreview id={style.id} />
            </div>
            <div className="font-bold text-gray-700 text-sm">
              {style.label}
            </div>
            <div className="text-xs text-gray-400 mt-1 leading-tight">
              {style.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
