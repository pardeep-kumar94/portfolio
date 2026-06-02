import { NextResponse } from "next/server";
import { getRoles } from "@/lib/notion";

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await getRoles();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[/api/portfolio/roles]", err);
    return NextResponse.json({ error: "Failed to fetch roles" }, { status: 500 });
  }
}
