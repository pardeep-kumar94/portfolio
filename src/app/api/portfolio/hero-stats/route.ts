import { NextResponse } from "next/server";
import { getHeroStats } from "@/lib/notion";

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await getHeroStats();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[/api/portfolio/hero-stats]", err);
    return NextResponse.json({ error: "Failed to fetch hero stats" }, { status: 500 });
  }
}
