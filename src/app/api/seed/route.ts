import { NextResponse } from "next/server";
import { seedDatabase } from "@/app/lib/seed";

export async function GET() {
  try {
    seedDatabase();

    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (err) {
    console.error("Seeding error:", err);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
