import { sql, like } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

export const getUsers = async () => {
  return await db.query.users.findMany();
};

export const getByUserName = async (userName: string) => {
  return await db.query.users.findFirst({
    where: like(users.username, userName),
    with: { blogs: true },
  });
};
