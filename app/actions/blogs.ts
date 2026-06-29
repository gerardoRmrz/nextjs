"use server";

import { redirect } from "next/navigation";
import { addNewBlog, incrementLikes } from "../services/blogs";
import { revalidatePath } from "next/cache";
import { blogsDB } from "@/db/schema";

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  const newBlog = {
    title,
    author,
    url,
    likes: 0,
  };

  //console.log("********>", newBlog);

  type newBlogInfer = typeof blogsDB.$inferInsert;

  addNewBlog(newBlog as newBlogInfer);

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
