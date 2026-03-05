import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  // Only allow known image host URLs
  const ALLOWED_HOSTS = [
    ".blob.core.windows.net",
    ".replicate.delivery",
    ".replicate.com",
  ];
  try {
    const parsed = new URL(imageUrl);
    if (!ALLOWED_HOSTS.some((h) => parsed.hostname.endsWith(h))) {
      return NextResponse.json({ error: "Invalid image URL" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const response = await fetch(imageUrl);
  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 502 });
  }

  const blob = await response.blob();
  const headers = new Headers();
  headers.set("Content-Type", blob.type || "image/png");
  headers.set("Cache-Control", "public, max-age=3600");

  return new NextResponse(blob, { headers });
}
