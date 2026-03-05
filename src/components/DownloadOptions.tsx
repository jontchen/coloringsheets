"use client";

import { useState } from "react";
import { GenerationResult, PageSize } from "@/types";
import { generatePDF } from "@/lib/pdf-generator";

interface DownloadOptionsProps {
  result: GenerationResult;
  pageSize: PageSize;
}

function proxyUrl(imageUrl: string): string {
  return `/api/download?url=${encodeURIComponent(imageUrl)}`;
}

export default function DownloadOptions({
  result,
  pageSize,
}: DownloadOptionsProps) {
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadingPng, setDownloadingPng] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadPNG = async () => {
    setDownloadingPng(true);
    setError(null);
    try {
      const response = await fetch(proxyUrl(result.imageUrl));
      if (!response.ok) throw new Error("Failed to download image");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `coloring-sheet-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed");
    } finally {
      setDownloadingPng(false);
    }
  };

  const downloadPDF = async () => {
    setDownloadingPdf(true);
    setError(null);
    try {
      const proxied = proxyUrl(result.imageUrl);
      const blob = await generatePDF(proxied, pageSize);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `coloring-sheet-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "PDF creation failed");
    } finally {
      setDownloadingPdf(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h3 className="text-xl font-bold text-gray-700">
        Your coloring sheet is ready!
      </h3>

      <div className="w-full max-w-sm rounded-2xl border-3 border-violet-200 overflow-hidden shadow-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={result.imageUrl}
          alt="Your coloring sheet"
          className="w-full aspect-[8.5/11] object-cover bg-white"
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm font-bold">{error}</div>
      )}

      <div className="flex gap-4 w-full max-w-sm">
        <button
          onClick={downloadPNG}
          disabled={downloadingPng}
          className="flex-1 py-4 px-6 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold rounded-2xl transition-colors shadow-md"
        >
          {downloadingPng ? "Downloading..." : "PNG Image"}
        </button>
        <button
          onClick={downloadPDF}
          disabled={downloadingPdf}
          className="flex-1 py-4 px-6 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-bold rounded-2xl transition-colors shadow-md"
        >
          {downloadingPdf ? "Creating PDF..." : "PDF (Print Ready)"}
        </button>
      </div>
    </div>
  );
}
