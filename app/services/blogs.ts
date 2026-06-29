import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { blogsDB } from "@/db/schema";

import { Blog, newBlog } from "../types/types";

/* const blogs: Blog[] = [
  {
    id: 1,
    title: "Becoming a Hacker: Must Read Security & Cyber Crime Books",
    author: "Matt Fay",
    url: "https://javascripttoday.com/blog/becoming-a-hacker-book-list",
    likes: 0,
  },
  {
    id: 2,
    title: "The Best JavaScript Blogs for Developers in 2025",
    author: "Matthew Warholak",
    url: "https://draft.dev/learn/javascript-blogs",
    likes: 2,
  },
  {
    id: 3,
    title: "Storing Metadata On Select Option Elements",
    author: "Ben Nadel",
    url: "https://www.bennadel.com/blog/4860-storing-metadata-on-select-option-elements.htm",
    likes: 4,
  },
  {
    id: 4,
    title: "Image formats: Codecs and compression tools",
    author: "Polina Gurtovaia",
    likes: 3,
  },
];
 */

export const getBlogs = async (searchTerm: string | null) => {
  const allBlogs = await db.query.blogsDB.findMany();
  /* if (searchTerm) {
    return allBlogs.filter((blog) => blog.title.includes(searchTerm));
  } */
  return allBlogs;
};

export const getBlogsById = async (id: number) => {
  return await db.query.blogsDB.findFirst({
    where: eq(blogsDB.id, id),
  });
};

type newBlogInfer = typeof blogsDB.$inferInsert;

export const addNewBlog = async (newBlog: newBlogInfer) => {
  await db.insert(blogsDB).values({
    title: newBlog.title,
    author: newBlog.author,
    url: newBlog.url,
    userId: newBlog.userId,
  });
};

export const incrementLikes = async (id: number) => {
  await db
    .update(blogsDB)
    .set({ likes: sql`${blogsDB.likes} + 1` })
    .where(eq(blogsDB.id, id));
};

export const handleChange = () => {};
