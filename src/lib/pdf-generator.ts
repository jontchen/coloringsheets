import { jsPDF } from "jspdf";
import { PageSize } from "@/types";

const PAGE_DIMENSIONS: Record<PageSize, { width: number; height: number; unit: "in" | "mm" }> = {
  letter: { width: 8.5, height: 11, unit: "in" },
  a4: { width: 210, height: 297, unit: "mm" },
};

export async function generatePDF(
  imageUrl: string,
  pageSize: PageSize
): Promise<Blob> {
  const dims = PAGE_DIMENSIONS[pageSize];
  const doc = new jsPDF({
    orientation: "portrait",
    unit: dims.unit,
    format: [dims.width, dims.height],
  });

  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const dataUrl = await blobToDataUrl(blob);

  const margin = dims.unit === "in" ? 0.25 : 6;
  const imgWidth = dims.width - margin * 2;
  const imgHeight = dims.height - margin * 2;

  doc.addImage(dataUrl, "PNG", margin, margin, imgWidth, imgHeight);

  return doc.output("blob");
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
