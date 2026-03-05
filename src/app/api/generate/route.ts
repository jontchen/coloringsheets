import { NextRequest, NextResponse } from "next/server";
import { getReplicateClient } from "@/lib/replicate";
import { buildPrompt } from "@/lib/prompt-builder";
import { SheetConfig } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const { config, count = 2 } = (await request.json()) as {
      config: SheetConfig;
      count?: number;
    };

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "Replicate API token not configured" },
        { status: 500 }
      );
    }

    const prompt = buildPrompt(config);
    const client = getReplicateClient();

    const variationCount = Math.min(Math.max(count, 1), 4);
    const results = await Promise.all(
      Array.from({ length: variationCount }, async (_, i) => {
        const output = await client.run("black-forest-labs/flux-schnell", {
          input: {
            prompt,
            num_outputs: 1,
            aspect_ratio: "3:4",
            output_format: "png",
            output_quality: 100,
          },
        });

        // Flux returns an array of file URLs
        const urls = output as unknown as string[];
        const imageUrl = urls?.[0] ?? "";

        return {
          id: `variation-${i}-${Date.now()}`,
          imageUrl,
          prompt,
        };
      })
    );

    return NextResponse.json({ results, prompt });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
