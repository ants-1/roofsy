import { NextResponse } from "next/server";
import { fetchFilteredProperties } from "@/app/lib/data";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || "Sale";
  const query = searchParams.get("query") || "";

  const minBeds = searchParams.get("minBeds") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const category = searchParams.get("category") || "";

  try {
    const properties = await fetchFilteredProperties({
      status,
      query,
      minBeds,
      maxPrice,
      category,
    });
    return NextResponse.json(properties);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
