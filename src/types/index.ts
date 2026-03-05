export type PageSize = "letter" | "a4";

export type Orientation = "portrait" | "landscape";

export type SheetStyle =
  | "simple"
  | "cartoon"
  | "realistic"
  | "mandala"
  | "zentangle"
  | "stained-glass";

export type TopicCategory =
  | "animals"
  | "nature"
  | "fantasy"
  | "vehicles"
  | "food"
  | "holidays"
  | "people"
  | "patterns";

export interface TopicSelection {
  category: TopicCategory;
  subcategory: string;
}

export interface SheetConfig {
  pageSize: PageSize;
  orientation: Orientation;
  style: SheetStyle;
  topic: TopicSelection;
  additionalDetails: string;
}

export interface GenerationResult {
  id: string;
  imageUrl: string;
  prompt: string;
}

export interface GenerationParams {
  model: string;
  width: number;
  height: number;
  outputFormat: string;
  outputQuality: number;
  imageCount: number;
}

export type WizardStep = "configure" | "preview" | "download";
