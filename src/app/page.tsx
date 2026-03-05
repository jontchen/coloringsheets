"use client";

import { useState } from "react";
import {
  SheetConfig,
  GenerationResult,
  WizardStep,
} from "@/types";
import StepIndicator from "@/components/StepIndicator";
import OrientationSelector from "@/components/OrientationSelector";
import StyleSelector from "@/components/StyleSelector";
import TopicSelector from "@/components/TopicSelector";
import AdditionalInput from "@/components/AdditionalInput";
import PreviewGrid from "@/components/PreviewGrid";
import DownloadOptions from "@/components/DownloadOptions";
import DebugPanel, { buildDebugInfo } from "@/components/DebugPanel";

// DEV_MODE: set to false before going to market
const DEV_MODE = true;

const DEFAULT_CONFIG: SheetConfig = {
  pageSize: "letter",
  orientation: "portrait",
  style: "simple",
  topic: { category: "animals", subcategory: "Farm Animals" },
  additionalDetails: "",
};

export default function Home() {
  const [step, setStep] = useState<WizardStep>("configure");
  const [config, setConfig] = useState<SheetConfig>(DEFAULT_CONFIG);
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<ReturnType<typeof buildDebugInfo> | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setStep("preview");
    setResults([]);
    setSelectedId(null);

    const startTime = Date.now();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation failed");
      }

      setResults(data.results);
      if (data.results.length > 0) {
        setSelectedId(data.results[0].id);
      }

      if (DEV_MODE && data.params) {
        setDebugInfo(
          buildDebugInfo(data.prompt, data.params, Date.now() - startTime)
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  const selectedResult = results.find((r) => r.id === selectedId);

  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white py-6 px-4 shadow-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Coloring Sheet Generator
          </h1>
          <p className="text-violet-100 mt-1 text-sm">
            Design, preview, and print beautiful coloring pages
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <StepIndicator currentStep={step} />

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-red-600 text-sm">
            <strong>Error:</strong> {error}
            <button
              onClick={() => setError(null)}
              className="ml-3 text-red-400 hover:text-red-600 font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Step 1: Configure */}
        {step === "configure" && (
          <div className="space-y-8">
            <OrientationSelector
              value={config.orientation}
              onChange={(orientation) => setConfig({ ...config, orientation })}
            />
            <StyleSelector
              value={config.style}
              onChange={(style) => setConfig({ ...config, style })}
            />
            <TopicSelector
              value={config.topic}
              onChange={(topic) => setConfig({ ...config, topic })}
            />
            <AdditionalInput
              value={config.additionalDetails}
              onChange={(additionalDetails) =>
                setConfig({ ...config, additionalDetails })
              }
            />
            <button
              onClick={handleGenerate}
              className="w-full py-4 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white font-black text-lg rounded-2xl shadow-lg transition-all hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
            >
              Generate Coloring Sheets
            </button>
          </div>
        )}

        {/* Step 2: Preview */}
        {step === "preview" && (
          <div className="space-y-6">
            <PreviewGrid
              results={results}
              selectedId={selectedId}
              onSelect={setSelectedId}
              isLoading={isLoading}
              orientation={config.orientation}
            />

            {!isLoading && results.length > 0 && (
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("configure")}
                  className="flex-1 py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-2xl transition-colors"
                >
                  Back to Edit
                </button>
                <button
                  onClick={handleRegenerate}
                  className="flex-1 py-3 px-6 bg-orange-400 hover:bg-orange-500 text-white font-bold rounded-2xl transition-colors"
                >
                  Regenerate
                </button>
                <button
                  onClick={() => selectedId && setStep("download")}
                  disabled={!selectedId}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 disabled:opacity-50 text-white font-bold rounded-2xl transition-all"
                >
                  Download
                </button>
              </div>
            )}

            {!isLoading && error && (
              <button
                onClick={() => setStep("configure")}
                className="w-full py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-2xl transition-colors"
              >
                Back to Edit
              </button>
            )}

            {DEV_MODE && <DebugPanel info={debugInfo} />}
          </div>
        )}

        {/* Step 3: Download */}
        {step === "download" && selectedResult && (
          <div className="space-y-6">
            <DownloadOptions
              result={selectedResult}
              orientation={config.orientation}
            />
            <div className="flex gap-3 max-w-sm mx-auto">
              <button
                onClick={() => setStep("preview")}
                className="flex-1 py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-2xl transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setStep("configure");
                  setResults([]);
                  setSelectedId(null);
                }}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white font-bold rounded-2xl transition-all"
              >
                Create Another
              </button>
            </div>

            {DEV_MODE && <DebugPanel info={debugInfo} />}
          </div>
        )}
      </main>
    </div>
  );
}
