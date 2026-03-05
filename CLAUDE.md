# Coloring Sheet Generator

## Project Overview
A web-based coloring sheet generator that lets users configure selections before AI generation, ensuring output matches their choices. Simple, playful UI with quick-select tools for fast sheet creation.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI Generation:** OpenAI API (DALL-E 3)
- **PDF Generation:** jsPDF (or similar) for print-ready PDF output
- **Deployment:** Vercel

## Architecture
- Stateless app — no database, no user accounts
- Next.js API routes handle OpenAI calls server-side (keeps API key secure)
- Client-side PDF generation from the high-res image output
- All configuration happens client-side before generation request

## Core Features

### Selection UI (Step 1)
Quick-select controls presented before generation:

**Page Size:**
- US Letter (8.5" x 11")
- A4 (210mm x 297mm)

**Coloring Sheet Style:**
- Simple (kids, bold outlines, large shapes)
- Cartoon (fun, expressive, comic-style)
- Realistic (detailed but still line art)
- Mandala (circular, symmetrical patterns)
- Zentangle (abstract, repetitive patterns)
- Stained Glass (bold segmented areas)

**Topic Categories (with subcategories):**
- Animals: Farm, Wildlife, Sea Life, Insects, Birds, Pets, Dinosaurs
- Nature: Flowers, Trees, Landscapes, Weather, Seasons, Gardens
- Fantasy: Dragons, Unicorns, Fairies, Castles, Mermaids, Wizards
- Vehicles: Cars, Trucks, Planes, Boats, Trains, Space
- Food: Fruits, Vegetables, Desserts, Meals, Drinks
- Holidays: Christmas, Halloween, Easter, Thanksgiving, Valentine's
- People: Occupations, Sports, Music, Dance, Family
- Patterns: Geometric, Floral, Abstract, Tribal, Celtic

**Optional Additional Input:**
- Free-text field for specific details (e.g., "a dragon sitting on a pile of books")
- This supplements but does not override the selected style/topic

### Preview & Variations (Step 2)
- Generate 2-4 variations based on selections
- Display as a grid for comparison
- User selects preferred variation
- Optional: tweak settings and regenerate

### Download (Step 3)
- High-res PNG image download
- Print-ready PDF at selected page size
- Both options available for chosen variation

## UI/UX Guidelines
- **Theme:** Playful and colorful — bright colors, rounded corners, friendly typography
- **Layout:** Step-by-step wizard flow (Select -> Preview -> Download)
- **Interactions:** Large clickable cards/chips for selections, not dropdowns
- **Responsive:** Works on desktop and mobile
- **Feedback:** Loading states during generation, progress indicators

## AI Prompt Engineering
- Build structured prompts from user selections
- Always include: "black and white line art coloring page, clean outlines, no shading, no filled areas, white background"
- Map style selections to specific prompt modifiers
- Map topic + subcategory to descriptive prompt segments
- Append user's optional free-text input
- Validate that generated images are suitable coloring sheets (high contrast, clear lines)

## Output Requirements
- Images must be high resolution (minimum 2048x2048 for print quality)
- Clean black lines on pure white background
- No gray shading, gradients, or filled regions
- Appropriate complexity for the selected style
- Proper aspect ratio for selected page size

## File Structure
```
coloringsheets/
  src/
    app/
      page.tsx              # Main page with wizard flow
      layout.tsx            # Root layout
      api/
        generate/
          route.ts          # OpenAI generation endpoint
    components/
      PageSizeSelector.tsx
      StyleSelector.tsx
      TopicSelector.tsx
      AdditionalInput.tsx
      PreviewGrid.tsx
      DownloadOptions.tsx
      StepIndicator.tsx
    lib/
      prompt-builder.ts     # Constructs AI prompts from selections
      pdf-generator.ts      # Converts image to print-ready PDF
      openai.ts             # OpenAI client config
    types/
      index.ts              # Shared TypeScript types
    data/
      topics.ts             # Topic/subcategory definitions
      styles.ts             # Style definitions and prompt mappings
```

## Development Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Lint check
```

## Environment Variables
```
OPENAI_API_KEY=      # Required — OpenAI API key for DALL-E 3
```

## Key Conventions
- Use App Router (not Pages Router)
- Server components by default, "use client" only where needed
- Keep API key server-side only (API routes)
- Selections use TypeScript enums/unions for type safety
- Prompt building is centralized in prompt-builder.ts
