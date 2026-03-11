import { NextResponse } from "next/server";
import { getHomeCarouselImages } from "@/lib/db/queries";

export async function GET() {
  try {
    const images = await getHomeCarouselImages();
    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching carousel images:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
