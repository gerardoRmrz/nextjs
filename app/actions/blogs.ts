"use server";

import { auth } from "@/app/api/auth/auth";
import { redirect } from "next/navigation";
import {
  addNewBlog,
  incrementLikes,
  addBlogToReadingList,
  setReadBlog,
} from "../services/blogs";
import { revalidatePath } from "next/cache";
import { blogs, readingLists } from "@/db/schema";
import { db } from "@/db";

export const createBlog = async (
  prevState: {
    errors: {};
    values: { title: string; author: string; url: string };
    success: boolean;
  },
  formData: FormData,
) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  const errors = {};

  if (!author || author.length < 5) {
    (errors as any).author = "Author must be at least 5 characters long";
  }

  if (!title || title.length < 5) {
    (errors as any).title = "Title must be at least 5 characters long";
  }

  if (!url || url.length < 5) {
    (errors as any).url = "URL must be at least 5 characters long";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors: { ...errors },
      values: { title, author, url },
      success: false,
    };
  }

  const newBlog = {
    title,
    author,
    url,
    likes: 0,
  };

  type newBlogInfer = typeof blogs.$inferInsert;

  await addNewBlog(newBlog as newBlogInfer);

  revalidatePath("/blogs");

  return { errors: "", values: { title, author, url }, success: true };
};

export const incrementBlogLikes = async (
  prevState: { error: string; success: boolean; executed: boolean },
  formData: FormData,
) => {
  try {
    const id = formData.get("id") as string;
    incrementLikes(Number(id));
    revalidatePath(`/blogs/${id}`);
    revalidatePath(`/blogs`);
    return {
      error: "",
      success: true,
      executed: true,
    };
  } catch (error) {
    return {
      error: `Error: ${error}`,
      success: false,
      executed: true,
    };
  }
};

export const addReadingList = async (
  prevState: { error: string; success: boolean; executed: boolean },
  formData: FormData,
) => {
  try {
    const id = formData.get("id") as string;
    const session = await auth();

    if (!session) {
      throw new Error("Not logged in");
    }

    addBlogToReadingList(session.user?.email, Number(id));
    revalidatePath(`/me`);
    return { error: "", success: true, executed: true };
  } catch (error) {
    return { error: `Error: ${error}`, success: false, executed: true };
  }
};

export const markAsRead = async (formData: FormData) => {
  const blogId = formData.get("blogId") as string;
  const currentUserId = formData.get("UserId") as string;

  await setReadBlog(Number(currentUserId), Number(blogId));
  revalidatePath("/me");
};

export const searchResult = async (formData: FormData) => {
  const searchTerm = formData.get("searchTerm") as string;
  if (searchTerm === "") {
    redirect("/blogs");
  }
  redirect(`/blogs?filter=${searchTerm}`);
};
