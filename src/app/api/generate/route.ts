import { NextRequest, NextResponse } from "next/server";
import { getReplicateClient } from "@/lib/replicate";
import { buildPrompt } from "@/lib/prompt-builder";
import { SheetConfig } from "@/types";

const MODEL = "black-forest-labs/flux-schnell";

// Max ~4MP at 8.5:11 ratio
const DIMENSIONS = {
  portrait: { width: 1768, height: 2288 },
  landscape: { width: 2288, height: 1768 },
};

async function fetchImageAsDataUrl(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch generated image");
  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  const mimeType = response.headers.get("content-type") || "image/png";
  return `data:${mimeType};base64,${base64}`;
}

async function generateOne(
  client: ReturnType<typeof getReplicateClient>,
  prompt: string,
  dims: { width: number; height: number },
  index: number,
  retries = 2
): Promise<{ id: string; imageUrl: string; prompt: string }> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const output = await client.run(MODEL, {
        input: {
          prompt,
          num_outputs: 1,
          width: dims.width,
          height: dims.height,
          output_format: "png",
          output_quality: 100,
        },
      });

      const urls = output as unknown as string[];
      const replicateUrl = urls?.[0] ?? "";
      const imageUrl = replicateUrl
        ? await fetchImageAsDataUrl(replicateUrl)
        : "";

      return {
        id: `variation-${index}-${Date.now()}`,
        imageUrl,
        prompt,
      };
    } catch (err: unknown) {
      const is429 =
        err instanceof Error && err.message.includes("429");
      if (is429 && attempt < retries) {
        await new Promise((r) => setTimeout(r, (attempt + 1) * 12000));
        continue;
      }
      throw err;
    }
  }
  throw new Error("Generation failed after retries");
}

export async function POST(request: NextRequest) {
  try {
    const { config } = (await request.json()) as {
      config: SheetConfig;
    };

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "Replicate API token not configured" },
        { status: 500 }
      );
    }

    const prompt = buildPrompt(config);
    const client = getReplicateClient();
    const dims = DIMENSIONS[config.orientation] || DIMENSIONS.portrait;

    const results = [];
    for (let i = 0; i < 2; i++) {
      results.push(await generateOne(client, prompt, dims, i));
    }

    return NextResponse.json({
      results,
      prompt,
      params: {
        model: MODEL,
        width: dims.width,
        height: dims.height,
        outputFormat: "png",
        outputQuality: 100,
        imageCount: results.length,
      },
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
