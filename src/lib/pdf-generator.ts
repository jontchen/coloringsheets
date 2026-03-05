import { jsPDF } from "jspdf";
import { PageSize } from "@/types";

export async function generatePDF(
  dataUrl: string,
  _pageSize: PageSize = "letter"
): Promise<Blob> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: [8.5, 11],
  });

  // Full bleed — image fills the entire page
  doc.addImage(dataUrl, "PNG", 0, 0, 8.5, 11);

  return doc.output("blob");
}
