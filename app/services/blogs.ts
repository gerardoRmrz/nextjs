import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { blogs } from "@/db/schema";

import { getCurrentUser } from "./session";

export const getBlogs = async (searchTerm: string | null) => {
  const allBlogs = await db.query.blogs.findMany();
  /* if (searchTerm) {
    return allBlogs.filter((blog) => blog.title.includes(searchTerm));
  } */
  return allBlogs;
};

export const getBlogsById = async (id: number) => {
  return await db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });
};

type newBlogInfer = typeof blogs.$inferInsert;

export const addNewBlog = async (newBlog: newBlogInfer) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Not logged in");
  }

  await db.insert(blogs).values({
    title: newBlog.title,
    author: newBlog.author,
    url: newBlog.url,
    user_Id: user.id,
  });
};

export const incrementLikes = async (id: number) => {
  await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id));
};

export const handleChange = () => {};
