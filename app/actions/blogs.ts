"use server";

import { auth } from "@/app/api/auth/auth";
import { redirect } from "next/navigation";
import { addNewBlog, incrementLikes } from "../services/blogs";
import { revalidatePath } from "next/cache";
import { blogs } from "@/db/schema";

export const createBlog = async (
  pervState: { error: string },
  formData: FormData,
) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  if (!title || title.length < 5) {
    return { error: "Title must be at least 5 characters long" };
  }

  const author = formData.get("author") as string;
  if (!author || author.length < 5) {
    return { error: "Author must be at least 5 characters long" };
  }

  const url = formData.get("url") as string;
  if (!url || url.length < 5) {
    return { error: "URL must be at least 5 characters long" };
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
