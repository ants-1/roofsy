import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function POST(req: Request) {
  const { userId, propertyId } = await req.json();

  if (!userId || !propertyId) {
    return NextResponse.json(
      { message: "Missing userId or propertyId" },
      { status: 400 }
    );
  }

  try {
    const existing = await sql`
      SELECT id FROM saved_properties 
      WHERE user_id = ${userId} AND property_id = ${propertyId}
    `;

    if (existing.length > 0) {
      await sql`
        DELETE FROM saved_properties 
        WHERE user_id = ${userId} AND property_id = ${propertyId}
      `;
      return NextResponse.json({ saved: false, message: "Property unsaved." });
    } else {
      await sql`
        INSERT INTO saved_properties (user_id, property_id)
        VALUES (${userId}, ${propertyId})
      `;
      return NextResponse.json({ saved: true, message: "Property saved." });
    }
  } catch (error) {
    console.error("Toggle saved property error:", error);
    return NextResponse.json({ message: "Database error" }, { status: 500 });
  }
}
