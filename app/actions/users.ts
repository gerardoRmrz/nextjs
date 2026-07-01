"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "../../db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";

export const registerUser = async (
  prevState: {
    errors: {};
    values: { username: string; name: string; password: string };
  },
  formData: FormData,
) => {
  const name = (formData.get("name") as string)?.trim();
  const username = (formData.get("username") as string)?.trim();
  const password = formData.get("password") as string;

  const errors = {};

  if (!username || username.length < 4) {
    (errors as any).username =
      "The username must be at least 4 characters long";
  }

  if (!password || password.length < 4) {
    (errors as any).password =
      "The password must be at least 4 characters long";
  }

  const userExist = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (!!userExist) {
    (errors as any).userExist = "The username already exist";
  }

  if (Object.keys(errors).length > 0) {
    return { errors: { ...errors }, values: { username, name, password } };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });

  redirect("/login");
};
