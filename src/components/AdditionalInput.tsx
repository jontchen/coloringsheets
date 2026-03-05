"use client";

interface AdditionalInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AdditionalInput({
  value,
  onChange,
}: AdditionalInputProps) {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-700 mb-2">
        Additional Details{" "}
        <span className="text-sm font-normal text-gray-400">(optional)</span>
      </h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='e.g., "a dragon sitting on a pile of books" or "sunflowers in a garden with a butterfly"'
        className="w-full p-4 rounded-2xl border-3 border-gray-200 bg-white text-gray-700 placeholder-gray-300 resize-none h-24 focus:border-violet-500 focus:outline-none transition-colors"
        maxLength={200}
      />
      <div className="text-xs text-gray-400 text-right mt-1">
        {value.length}/200
      </div>
    </div>
  );
}
