import { NextResponse } from "next/server";
import { getConfig } from "@/lib/notion";

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await getConfig();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[/api/portfolio/config]", err);
    return NextResponse.json({ error: "Failed to fetch config" }, { status: 500 });
  }
}
