import { NextResponse } from "next/server";
import { getAchievements } from "@/lib/notion";

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await getAchievements();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[/api/portfolio/achievements]", err);
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 });
  }
}
