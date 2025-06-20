'use server';

import { signIn } from "../../../auth";
import { AuthError } from "next-auth";
import postgres from "postgres";
import bcrypt from "bcryptjs";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require"});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signUp(
  prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const name = formData.get('name')?.toString();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const confirmPassword = formData.get('confirmPassword')?.toString();
  const redirectTo = formData.get('redirectTo')?.toString() || "/";

  if (!name || !email || !password || !confirmPassword) {
    return "All fields are required";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
  if (existingUser.length > 0) {
    return "User already exists.";
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await sql`
    INSERT INTO users (name, email, password)
    values (${name}, ${email}, ${hashedPassword})
  `;

  await signIn('credentials', {
    email,
    password,
    redirect: true,
    redirectTo
  });

  return;
}