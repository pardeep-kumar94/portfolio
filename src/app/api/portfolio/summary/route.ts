import { NextResponse } from "next/server";
import { getSummary } from "@/lib/notion";

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await getSummary();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[/api/portfolio/summary]", err);
    return NextResponse.json({ error: "Failed to fetch summary" }, { status: 500 });
  }
}
