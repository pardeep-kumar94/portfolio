import { NextResponse } from "next/server";
import { getHero } from "@/lib/notion";

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await getHero();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[/api/portfolio/hero]", err);
    return NextResponse.json({ error: "Failed to fetch hero" }, { status: 500 });
  }
}
