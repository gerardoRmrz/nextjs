"use server";

import { redirect } from "next/navigation";
import { addNewBlog } from "../services/blogs";
import { revalidatePath } from "next/cache";

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

  console.log("********>", newBlog);

  addNewBlog(newBlog);

  revalidatePath("/blogs");
  redirect("/blogs");
};
