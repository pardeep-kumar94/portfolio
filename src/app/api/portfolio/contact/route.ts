import { NextResponse } from "next/server";
import { getContact } from "@/lib/notion";

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await getContact();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[/api/portfolio/contact]", err);
    return NextResponse.json({ error: "Failed to fetch contact" }, { status: 500 });
  }
}
