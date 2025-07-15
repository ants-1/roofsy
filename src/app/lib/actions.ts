"use server";

import { signIn } from "../../../auth";
import { AuthError } from "next-auth";
import postgres from "postgres";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function signUp(
  prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

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

  await signIn("credentials", {
    email,
    password,
    redirect: true,
    redirectTo: "/",
  });

  return;
}

export type State = {
  message: string | null;
  errors?: Record<string, string[]>;
};

const PropertyFormSchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  price: z.coerce.number().gt(0, { message: "Price must be greater than 0." }),
  beds: z.coerce.number().int().nonnegative(),
  baths: z.coerce.number().int().nonnegative(),
  receptions: z.coerce.number().int().nonnegative(),
  property_type: z.string(),
  property_status: z.string(),
  details: z.string(),
  property_address: z.string(),
  postcode: z.string(),
  agent: z.string(),
  imgs: z.any(),
});

const UserFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

const UserPasswordFormSchema = z.object({
  id: z.string(),
  oldPassword: z.string(),
  newPassword: z.string(),
});

const CreateProperty = PropertyFormSchema.omit({ id: true });

const UpdateProperty = PropertyFormSchema.omit({ id: true });

const UpdateUserInfo = UserFormSchema.omit({ id: true });

const UpdateUserPassword = UserPasswordFormSchema.omit({ id: true });

export async function createProperty(prevState: State, formData: FormData) {
  const validatedFields = CreateProperty.safeParse({
    ownerId: formData.get("ownerId"),
    price: formData.get("price"),
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    receptions: formData.get("receptions"),
    property_type: formData.get("property_type"),
    property_status: formData.get("property_status"),
    details: formData.get("details"),
    property_address: formData.get("property_address"),
    postcode: formData.get("postcode"),
    agent: formData.get("agent"),
    imgs: JSON.parse(formData.get("imgs")?.toString() || "[]"),
  });

  console.log({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecretExists: !!process.env.CLOUDINARY_API_SECRET,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to Create Property.",
    };
  }

  const {
    ownerId,
    price,
    beds,
    baths,
    receptions,
    property_type,
    property_status,
    details,
    property_address,
    postcode,
    agent,
    imgs,
  } = validatedFields.data;

  try {
    await sql`
      INSERT INTO properties (
        owner_id, price, beds, baths, receptions, property_type, property_status, details, property_address, postcode, agent, imgs
      ) VALUES (
        ${ownerId}, ${price}, ${beds}, ${baths}, ${receptions}, ${property_type}, ${property_status}, ${details}, ${property_address}, ${postcode}, ${agent}, ${imgs}
      )
    `;
  } catch (error) {
    console.error("Insert error:", error);
    return {
      message: "Database Error: Failed to create property.",
    };
  }

  const redirectLink = property_status === "Rent" ? "/rent" : "/buy";

  revalidatePath(redirectLink);
  redirect(redirectLink);
}

export async function updateProperty(prevState: State, formData: FormData) {
  const id = formData.get("id")?.toString();

  if (!id) {
    return { message: "ID is missing for update." };
  }

  const validatedFields = UpdateProperty.safeParse({
    id,
    ownerId: formData.get("ownerId"),
    price: formData.get("price"),
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    receptions: formData.get("receptions"),
    property_type: formData.get("property_type"),
    property_status: formData.get("property_status"),
    details: formData.get("details"),
    property_address: formData.get("property_address"),
    postcode: formData.get("postcode"),
    agent: formData.get("agent"),
    imgs: JSON.parse(formData.get("imgs")?.toString() || "[]"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation Failed: Could not update property.",
    };
  }

  const {
    ownerId,
    price,
    beds,
    baths,
    receptions,
    property_type,
    property_status,
    details,
    property_address,
    postcode,
    agent,
    imgs,
  } = validatedFields.data;

  try {
    await sql`
      UPDATE properties SET
        owner_id = ${ownerId},
        price = ${price},
        beds = ${beds},
        baths = ${baths},
        receptions = ${receptions},
        property_type = ${property_type},
        property_status = ${property_status},
        details = ${details},
        property_address = ${property_address},
        postcode = ${postcode},
        agent = ${agent},
        imgs = ${imgs}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to update property.",
    };
  }

  const redirectLink = property_status === "Rent" ? "/rent" : "/buy";

  revalidatePath(redirectLink);
  redirect(redirectLink);
}

export async function deleteProperty(id: string) {
  try {
    await sql`DELETE FROM properties WHERE id = ${id}`;
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to delete property.",
    };
  }
}

export async function updateUserInfo(prevState: State, formData: FormData) {
  const id = formData.get("id")?.toString();

  if (!id) {
    return { message: "ID is missing for updating user." };
  }

  const validatedFields = UpdateUserInfo.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation Failed: Could not update user information.",
    };
  }

  const { name, email } = validatedFields.data;

  const existingUser = await sql`SELECT * FROM users WHERE id = ${id}`;

  if (existingUser.length === 0) {
    return { message: "User not found with provided ID." };
  }

  try {
    const result = await sql`
      UPDATE users SET
        name = ${name},
        email = ${email}
      WHERE id = ${id}
    `;

    if (result.count === 0) {
      return { message: "No user found with the provided ID to update." };
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to update user's information.",
    };
  }

  revalidatePath("/");

  return { message: "User information updated successfully." };
}

export async function updateUserPassword(prevState: State, formData: FormData) {
  const id = formData.get("id")?.toString();

  if (!id) {
    return { message: "ID is missing for updating user password." };
  }

  const validatedFields = UpdateUserPassword.safeParse({
    oldPassword: formData.get("oldPassword")?.toString(),
    newPassword: formData.get("newPassword")?.toString(),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation Failed: Could not update password.",
    };
  }

  const { oldPassword, newPassword } = validatedFields.data;

  const user = await sql`SELECT password FROM users WHERE id = ${id}`;
  const existingPassword = user[0]?.password;

  if (!existingPassword) {
    return { message: "User has no password set." };
  }

  const isMatch = await bcrypt.compare(oldPassword, existingPassword);

  if (!isMatch) {
    return {
      message: "Old password is incorrect.",
    };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    await sql`
      UPDATE users SET 
        password = ${hashedPassword}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to update user's password.",
    };
  }

  revalidatePath("/");

  return { message: "Password updated successfully." };
}
