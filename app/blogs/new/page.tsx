"use client";
import { createBlog } from "../../actions/blogs";
import { useActionState } from "react";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, { error: "" });
  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>Title</label>
          <input type="text" name="title" required></input>
        </div>
        <div>
          <label>Author</label>
          <input type="text" name="author" required></input>
        </div>
        <div>
          <label>URL</label>
          <input type="text" name="url" required></input>
        </div>
        <button type="submit">Create</button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  );
};

export default NewBlog;
