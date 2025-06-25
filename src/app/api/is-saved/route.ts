import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function POST(req: Request) {
  const { userId, propertyId } = await req.json();

  if (!userId || !propertyId) {
    return NextResponse.json({ saved: false }, { status: 400 });
  }

  try {
    const result = await sql`
      SELECT 1 FROM saved_properties 
      WHERE user_id = ${userId} AND property_id = ${propertyId}
    `;
    return NextResponse.json({ saved: result.length > 0 });
  } catch (error) {
    console.error("Error checking saved status:", error);
    return NextResponse.json({ saved: false }, { status: 500 });
  }
}
