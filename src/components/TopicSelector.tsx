"use client";

import { TopicSelection } from "@/types";
import { TOPICS } from "@/data/topics";

interface TopicSelectorProps {
  value: TopicSelection;
  onChange: (topic: TopicSelection) => void;
}

export default function TopicSelector({
  value,
  onChange,
}: TopicSelectorProps) {
  const selectedTopic = TOPICS.find((t) => t.id === value.category);

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-700 mb-3">Topic</h3>

      {/* Category grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() =>
              onChange({
                category: topic.id,
                subcategory: topic.subcategories[0],
              })
            }
            className={`p-3 rounded-2xl border-3 transition-all text-center ${
              value.category === topic.id
                ? "border-violet-500 bg-violet-50 shadow-md scale-[1.02]"
                : "border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50/50"
            }`}
          >
            <div className="text-2xl mb-1">{topic.emoji}</div>
            <div className="font-bold text-gray-700 text-sm">
              {topic.label}
            </div>
          </button>
        ))}
      </div>

      {/* Subcategory chips */}
      {selectedTopic && (
        <div>
          <h4 className="text-sm font-bold text-gray-500 mb-2">
            {selectedTopic.label} Subcategory
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedTopic.subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() =>
                  onChange({ category: value.category, subcategory: sub })
                }
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  value.subcategory === sub
                    ? "bg-violet-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-violet-100 hover:text-violet-600"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
