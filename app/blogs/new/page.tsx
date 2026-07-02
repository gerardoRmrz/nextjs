"use client";
import { createBlog } from "../../actions/blogs";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/app/components/NotificationContext";

const NewBlog = () => {
  const initialState = {
    errors: {},
    values: { title: "", author: "", url: "" },
    success: false,
  };
  const [state, formAction] = useActionState(createBlog, initialState);
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("blog created");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  const renderError = (key: string, indx: number) => {
    if (Object.keys(state.errors).includes(key)) {
      return (
        <p style={{ color: "red" }}>
          {Object.values(state.errors)[indx] as string}
        </p>
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl">Create a new blog</h2>
      <form action={formAction} className="flex flex-col items-center my-3">
        <div>
          <label className="custom-label">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={state.values?.title}
            className="custom-input"
          ></input>
          {renderError("title", 0)}
        </div>
        <div>
          <label className="custom-label">Author</label>
          <input
            type="text"
            name="author"
            defaultValue={state.values?.author}
            className="custom-input"
          ></input>
          {renderError("author", 1)}
        </div>
        <div>
          <label className="custom-label">URL</label>
          <input
            type="text"
            name="url"
            defaultValue={state.values?.url}
            className="custom-input"
          ></input>
          {renderError("url", 2)}
        </div>
        <button type="submit" className="custom-button">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
