import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

export const getUsers = async () => {
  return await db.query.users.findMany();
};

export const getUserById = async (id: number) => {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
  });
};
