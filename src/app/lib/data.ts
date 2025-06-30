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
        property_status = LOWER(${status})
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

// Filtered property list - Buy, Rent
export async function fetchFilteredProperties({
  status,
  query,
  minBeds,
  maxPrice,
  category,
}: {
  status: string;
  query: string;
  minBeds: string;
  maxPrice: string;
  category: string;
}): Promise<Property[]> {
  try {
    let where = sql`WHERE true`;

    where = sql`${where} AND (property_status = ${status} OR property_status = LOWER(${status}))`;

    where = sql`${where} AND (
      details ILIKE ${`%${query}%`} OR
      property_type ILIKE ${`%${query}%`} OR
      property_address ILIKE ${`%${query}%`} OR
      postcode ILIKE ${`%${query}%`} OR
      agent ILIKE ${`%${query}%`} OR
      city ILIKE ${`%${query}%`} 
    )`;

    if (minBeds && minBeds !== "No Min" && minBeds !== "Studio") {
      const numBeds = parseInt(minBeds);
      if (!isNaN(numBeds)) {
        where = sql`${where} AND beds = ${numBeds}`;
      }
    } else if (minBeds === "Studio") {
      where = sql`${where} AND beds = 0`;
    }

    if (maxPrice && maxPrice !== "No Max") {
      const numPrice = parseInt(maxPrice.replace(/[^0-9]/g, ""));
      if (!isNaN(numPrice)) {
        where = sql`${where} AND price <= ${numPrice}`;
      }
    }

    if (category && category !== "No Location") {
      where = sql`${where} AND city ILIKE ${`%${category}%`}`;
    }

    const properties = await sql<Property[]>`
      SELECT * FROM properties
      ${where}
      ORDER BY created_at ASC
    `;

    return properties;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch filtered properties.");
  }
}
