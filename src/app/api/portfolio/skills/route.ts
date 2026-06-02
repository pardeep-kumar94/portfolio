import { NextResponse } from "next/server";
import { getSkills } from "@/lib/notion";

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await getSkills();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[/api/portfolio/skills]", err);
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}
