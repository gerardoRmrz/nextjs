"use server";

import { auth } from "@/app/api/auth/auth";
import { redirect } from "next/navigation";
import { addNewBlog, incrementLikes } from "../services/blogs";
import { revalidatePath } from "next/cache";
import { blogs } from "@/db/schema";

export const createBlog = async (
  prevState: {
    errors: {};
    values: { title: string; author: string; url: string };
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
    return { errors: { ...errors }, values: { title, author, url } };
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

  redirect("/blogs");
};

export const incrementBlogLikes = async (formData: FormData) => {
  const id = formData.get("id") as string;
  incrementLikes(Number(id));
  revalidatePath(`/blogs/${id}`);
  revalidatePath(`/blogs`);
};

export const searchResult = async (formData: FormData) => {
  const searchTerm = formData.get("searchTerm") as string;
  if (searchTerm === "") {
    redirect("/blogs");
  }
  redirect(`/blogs?filter=${searchTerm}`);
};
