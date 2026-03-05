import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const accessCode = process.env.ACCESS_CODE;

  // If no access code is set, access is open
  if (!accessCode) {
    return NextResponse.json({ valid: true });
  }

  const { code } = (await request.json()) as { code: string };

  if (code === accessCode) {
    return NextResponse.json({ valid: true });
  }

  return NextResponse.json({ valid: false }, { status: 401 });
}
