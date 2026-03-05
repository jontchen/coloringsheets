import { SheetConfig } from "@/types";
import { STYLES } from "@/data/styles";
import { generateSceneDescription } from "@/lib/scene-randomizer";

const STYLE_PROMPTS: Record<string, string> = {
  simple:
    "Draw it with very bold, thick black outlines and large, simple shapes that are easy for a young child to color in. Keep the detail minimal — no small parts, no intricate patterns. Think of a coloring book for ages 3-5. The subject should be large and centered, filling most of the page.",
  cartoon:
    "Draw it in a fun cartoon style with exaggerated proportions, expressive features, and bold comic-book outlines. Make it lively and playful like a children's cartoon coloring book.",
  realistic:
    "Draw it as detailed realistic line art with accurate proportions and fine clean outlines. Include naturalistic details like textures and shading lines, but only as outlines — never filled in. Like an adult coloring book with botanical or nature illustration quality.",
  mandala:
    "Arrange it as a circular mandala pattern with perfect radial symmetry. Use concentric rings of intricate repeating geometric and floral motifs radiating from a center point. The entire design should be contained in a circle that fills the full page edge to edge.",
  zentangle:
    "Fill the composition with abstract zentangle-style patterns. Use a variety of repetitive textures, geometric fills, and organic line patterns within distinct sections. Every area should contain a different intricate pattern.",
  "stained-glass":
    "Draw it in a stained glass window style with thick bold black lines dividing the image into distinct segments. Each segment should be a clearly enclosed empty area. The dividing lines should be very thick and prominent like lead came in real stained glass.",
};

export function buildPrompt(config: SheetConfig): string {
  const styleInstruction = STYLE_PROMPTS[config.style] || "";

  // If user provided details, use those directly. Otherwise, auto-generate a fun scene.
  const hasUserDetails = config.additionalDetails.trim().length > 0;
  const subject = hasUserDetails
    ? `${config.topic.subcategory}: ${config.additionalDetails.trim()}`
    : generateSceneDescription(config.topic.subcategory);

  return [
    `Create a full-page black and white coloring page of ${subject}.`,
    "The design MUST fill the ENTIRE page from edge to edge with no borders, margins, or empty space around the edges.",
    styleInstruction,
    "The image must be ONLY black lines on a pure white background.",
    "Do NOT include any shading, gradients, gray tones, filled-in black areas, shadows, or color.",
    "Do NOT include any text, words, letters, numbers, or watermarks.",
    "Do NOT include any border or frame around the design.",
    "Every area between the outlines must be completely white and empty, ready to be colored in with crayons or markers.",
    "The lines must be clean, crisp, and well-defined.",
    "The composition must extend to all four edges of the image — no empty margins.",
  ].join(" ");
}
