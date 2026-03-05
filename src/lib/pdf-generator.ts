import { jsPDF } from "jspdf";
import { Orientation } from "@/types";

export async function generatePDF(
  dataUrl: string,
  orientation: Orientation = "portrait"
): Promise<Blob> {
  const isLandscape = orientation === "landscape";
  const doc = new jsPDF({
    orientation: isLandscape ? "landscape" : "portrait",
    unit: "in",
    format: [8.5, 11],
  });

  const width = isLandscape ? 11 : 8.5;
  const height = isLandscape ? 8.5 : 11;

  doc.addImage(dataUrl, "PNG", 0, 0, width, height);

  return doc.output("blob");
}
