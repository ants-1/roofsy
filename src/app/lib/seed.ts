import postgres from "postgres";
import { users, properties, savedProperties } from "../lib/mock-data";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255),
      role VARCHAR(255)
    )
`;

  await Promise.all(
    users.map(
      (user) =>
        sql`
        INSERT INTO users (id, name, email, password, role)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${user.password}, ${user.role})
        ON CONFLICT (email) DO NOTHING
      `
    )
  );
}

async function seedProperties() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS properties (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      agent VARCHAR(255),
      price INT NOT NULL,
      feature_img VARCHAR(255),
      imgs TEXT[] NOT NULL,
      beds INT NOT NULL,
      baths INT NOT NULL,
      receptions INT NOT NULL,
      property_type VARCHAR(255),
      property_status VARCHAR(255),
      details TEXT,
      property_address VARCHAR(255),
      postcode VARCHAR(255),
      city VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await Promise.all(
    properties.map((property) => {
      return sql`
        INSERT INTO properties (
          id,
          owner_id,
          agent,
          price,
          imgs,
          beds,
          baths,
          receptions,
          property_type,
          property_status,
          details,
          property_address,
          city,
          postcode
        ) VALUES (
          ${property.id},
          ${property.owner_id},
          ${property.agent},
          ${property.price},
          ${property.imgs ?? []},
          ${property.beds},
          ${property.baths},
          ${property.receptions},
          ${property.property_type},
          ${property.property_status},
          ${property.details},
          ${property.property_address},
          ${property.city},
          ${property.postcode}
        )
        ON CONFLICT (id) DO NOTHING
      `;
    })
  );
}

async function seedSavedProperties() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS saved_properties (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE
    )
  `;

  await Promise.all(
    savedProperties.map(
      (saved) =>
        sql`
        INSERT INTO saved_properties (id, user_id, property_id)
        VALUES (${saved.id}, ${saved.user_id}, ${saved.property_id})
        ON CONFLICT (id) DO NOTHING
      `
    )
  );
}

async function dropTables() {
  await sql`DROP TABLE IF EXISTS saved_properties CASCADE;`;
  await sql`DROP TABLE IF EXISTS properties CASCADE;`;
  await sql`DROP TABLE IF EXISTS users CASCADE;`;
  await sql`DROP TABLE IF EXISTS agents CASCADE;`;
}

export async function seedDatabase() {
  await sql.begin(async () => {
    await dropTables();
    await seedUsers();
    await seedProperties();
    await seedSavedProperties();
  });
}

