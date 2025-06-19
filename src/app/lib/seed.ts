// import postgres from "postgres";
// import { users, agents, properties, savedProperties } from "../lib/mock-data";

// const sql = postgres(process.env.POSTGRES_URL!, {
//   ssl: "require",
// });

// async function seedUsers() {
//   await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await sql`
//     CREATE TABLE IF NOT EXISTS users (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL UNIQUE,
//       password VARCHAR(255),
//       role VARCHAR(255)
//     )
// `;

//   await Promise.all(
//     users.map(
//       (user) =>
//         sql`
//         INSERT INTO users (id, name, email, password, role)
//         VALUES (${user.id}, ${user.name}, ${user.email}, ${user.password}, ${user.role})
//         ON CONFLICT (email) DO NOTHING
//       `
//     )
//   );
// }

// async function seedAgents() {
//   await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await sql`
//     CREATE TABLE IF NOT EXISTS agents (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL UNIQUE,
//       phone VARCHAR(255)
//     )
//   `;

//   await Promise.all(
//     agents.map(
//       (agent) =>
//         sql`
//         INSERT INTO agents (id, name, email, phone)
//         VALUES (${agent.id}, ${agent.name}, ${agent.email}, ${agent.phone})
//         ON CONFLICT (email) DO NOTHING
//       `
//     )
//   );
// }

// async function seedProperties() {
//   await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await sql`
//     CREATE TABLE IF NOT EXISTS properties (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
//       agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE SET NULL,
//       price INT NOT NULL,
//       feature_img VARCHAR(255),
//       imgs TEXT[] NOT NULL,
//       beds INT NOT NULL,
//       baths INT NOT NULL,
//       receptions INT NOT NULL,
//       property_type VARCHAR(255),
//       property_status VARCHAR(255),
//       details TEXT,
//       property_address VARCHAR(255),
//       postcode VARCHAR(255),
//       created_at TIMESTAMP DEFAULT NOW()
//     )
//   `;

//   await Promise.all(
//     properties.map((property) => {
//       // Find the agent object for this property by name
//       const agent = agents.find((a) => a.name === property.agent);

//       if (!agent) {
//         console.warn(
//           `Agent not found for property ${property.id} with agent name ${property.agent}`
//         );
//         return Promise.resolve();
//       }

//       return sql`
//       INSERT INTO properties (
//         id,
//         owner_id,
//         agent_id,
//         price,
//         imgs,
//         beds,
//         baths,
//         receptions,
//         property_type,
//         property_status,
//         details,
//         property_address,
//         postcode
//       ) VALUES (
//         ${property.id},
//         ${property.owner_id},
//         ${agent.id},         
//         ${property.price},
//         ${property.imgs},
//         ${property.beds},
//         ${property.baths},
//         ${property.receptions},
//         ${property.property_type},
//         ${property.property_status},
//         ${property.details},
//         ${property.property_address},
//         ${property.postcode}
//       )
//       ON CONFLICT (id) DO NOTHING
//     `;
//     })
//   );
// }

// async function seedSavedProperties() {
//   await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await sql`
//     CREATE TABLE IF NOT EXISTS saved_properties (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
//       property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE
//     )
//   `;

//   await Promise.all(
//     savedProperties.map(
//       (saved) =>
//         sql`
//         INSERT INTO saved_properties (id, user_id, property_id)
//         VALUES (${saved.id}, ${saved.user_id}, ${saved.property_id})
//         ON CONFLICT (id) DO NOTHING
//       `
//     )
//   );
// }

// export async function GET() {
//   try {
//     await sql.begin(async (sql) => {
//       await seedUsers();
//       await seedAgents();
//       await seedProperties();
//       await seedSavedProperties();
//     });

//     return new Response(
//       JSON.stringify({ message: "Database seeded successfully" }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (err) {
//     console.error("Seeding error:", err);
//     return new Response(JSON.stringify({ error: "Failed to seed database" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
