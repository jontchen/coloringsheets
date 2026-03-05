import { NextRequest, NextResponse } from "next/server";

// 8.5 x 11 inches at 300 DPI
const TARGET_WIDTH = 2550;
const TARGET_HEIGHT = 3300;

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = (await request.json()) as { imageUrl: string };

    if (!imageUrl) {
      return NextResponse.json({ error: "Missing imageUrl" }, { status: 400 });
    }

    // Fetch the original image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch image" }, { status: 502 });
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const mimeType = response.headers.get("content-type") || "image/png";

    // Return the image data with target dimensions for client-side canvas processing
    return NextResponse.json({
      imageData: `data:${mimeType};base64,${base64}`,
      targetWidth: TARGET_WIDTH,
      targetHeight: TARGET_HEIGHT,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Processing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
