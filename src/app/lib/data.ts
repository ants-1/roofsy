import postgres from "postgres";
import { Property } from "./types";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

// Fetch all properties based on their status
export async function fetchProperties(status: string) {
  try {
    const properties = await sql<Property[]>`
      SELECT * FROM properties
      WHERE 
        property_status = ${status} OR
        property_status = ${status.toLowerCase()}
    `;

    return properties;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error(`Failed to fetch ${status} properties data: ${err}`);
  }
}

// Fetch all saved properties for a specific user
export async function fetchSavedProperties(userId: string) {
  try {
    const data = await sql<Property[]>`
      SELECT p.* FROM saved_properties sp
      JOIN properties p ON p.id = sp.property_id
      WHERE sp.user_id = ${userId}
    `;

    return data;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch saved properties data.");
  }
}

// Fetch all properties owned by a specific user
export async function fetchMyProperties(userId: string) {
  try {
    const data = await sql<
      Property[]
    >`SELECT * FROM properties WHERE owner_id = ${userId}`;

    return data;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch my properties.");
  }
}

// Fetch a specific property by its ID
export async function fetchProperty(id: string): Promise<Property | null> {
  try {
    const data = await sql<Property[]>`
      SELECT * FROM properties
      WHERE id = ${id}
      LIMIT 1
    `;

    return data.length > 0 ? data[0] : null;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch property.");
  }
}

// Filtered Property list - Buy, Rent, Sold
