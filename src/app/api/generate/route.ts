import { NextRequest, NextResponse } from "next/server";
import { getReplicateClient } from "@/lib/replicate";
import { buildPrompt } from "@/lib/prompt-builder";
import { SheetConfig } from "@/types";

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
  index: number,
  retries = 2
): Promise<{ id: string; imageUrl: string; prompt: string }> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const output = await client.run("black-forest-labs/flux-schnell", {
        input: {
          prompt,
          num_outputs: 1,
          width: 1768,
          height: 2288,
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
        // Wait before retrying on rate limit
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

    // Generate 2 sequentially to avoid rate limits on free/low-credit accounts
    const results = [];
    for (let i = 0; i < 2; i++) {
      results.push(await generateOne(client, prompt, i));
    }

    return NextResponse.json({ results, prompt });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
