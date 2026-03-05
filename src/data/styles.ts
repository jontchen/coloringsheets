import { SheetStyle } from "@/types";

export interface StyleOption {
  id: SheetStyle;
  label: string;
  description: string;
  promptModifier: string;
  color: string;
}

export const STYLES: StyleOption[] = [
  {
    id: "simple",
    label: "Simple",
    description: "Bold outlines, large shapes. Great for young kids.",
    promptModifier:
      "simple bold outlines, large easy-to-color shapes, minimal detail, kid-friendly",
    color: "bg-yellow-400",
  },
  {
    id: "cartoon",
    label: "Cartoon",
    description: "Fun, expressive, comic-style characters.",
    promptModifier:
      "cartoon style, fun expressive characters, comic-book outlines, playful",
    color: "bg-orange-400",
  },
  {
    id: "realistic",
    label: "Realistic",
    description: "Detailed line art with realistic proportions.",
    promptModifier:
      "realistic detailed line art, accurate proportions, fine outlines, naturalistic",
    color: "bg-blue-400",
  },
  {
    id: "mandala",
    label: "Mandala",
    description: "Circular symmetrical patterns.",
    promptModifier:
      "mandala style, circular symmetrical pattern, intricate repeating geometric design, centered composition",
    color: "bg-purple-400",
  },
  {
    id: "zentangle",
    label: "Zentangle",
    description: "Abstract repetitive patterns and textures.",
    promptModifier:
      "zentangle style, abstract repetitive patterns, intricate textures, meditative design",
    color: "bg-teal-400",
  },
  {
    id: "stained-glass",
    label: "Stained Glass",
    description: "Bold segmented areas with thick dividing lines.",
    promptModifier:
      "stained glass style, bold segmented areas, thick black dividing lines, mosaic-like composition",
    color: "bg-pink-400",
  },
];
