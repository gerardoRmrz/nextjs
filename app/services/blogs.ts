"use server";
import { eq, sql, and } from "drizzle-orm";
import { db } from "../../db";
import { users, blogs, readingLists } from "@/db/schema";
import { getCurrentUser } from "./session";
import { revalidatePath } from "next/cache";

export const getBlogs = async (searchTerm: string | null) => {
  const allBlogs = await db.query.blogs.findMany();
  if (searchTerm) {
    return allBlogs.filter((blog) => blog.title.includes(searchTerm));
  }
  return allBlogs;
};

export const getBlogsById = async (id: number) => {
  const [result] = await db
    .select()
    .from(blogs)
    .leftJoin(readingLists, eq(readingLists.blog_Id, blogs.id))
    .where(eq(blogs.id, id));

  return result;
};

type newBlogInfer = typeof blogs.$inferInsert;

export const addNewBlog = async (newBlog: newBlogInfer) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Not logged in");
  }

  const [result] = await db
    .insert(blogs)
    .values({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      user_Id: user.id,
    })
    .returning({ insertedId: blogs.id });
  await addBlogToReadingList(user.username, result.insertedId);
};

export const incrementLikes = async (id: number) => {
  await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id));
};

export const addBlogToReadingList = async (
  username: string | null | undefined,
  blogId: number,
) => {
  if (!username) {
    throw new Error("Not logged in");
  }
  // find currentUser
  const [userId] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.username, username));

  await db.insert(readingLists).values({
    user_Id: userId.id,
    blog_Id: blogId,
    read: false,
  });
};

export const getReadingList = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(readingLists)
      .leftJoin(blogs, eq(readingLists.blog_Id, blogs.id))
      .where(eq(readingLists.user_Id, id));
    return result;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};

export const setReadBlog = async (currentUserId: number, blogId: number) => {
  console.log("++++++++++++++++>> ", currentUserId, blogId);
  try {
    await db
      .update(readingLists)
      .set({ read: true })
      .where(
        and(
          eq(readingLists.blog_Id, blogId),
          eq(readingLists.user_Id, currentUserId),
        ),
      );
    revalidatePath("/me");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
