import { NextResponse } from "next/server";
import { getCaseStudies } from "@/lib/notion";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") ?? undefined;
    const data = await getCaseStudies(type);
    return NextResponse.json(data);
  } catch (err) {
    console.error("[/api/portfolio/case-studies]", err);
    return NextResponse.json({ error: "Failed to fetch case studies" }, { status: 500 });
  }
}
