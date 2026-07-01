"use client";
import { createBlog } from "../../actions/blogs";
import { useActionState } from "react";

const NewBlog = () => {
  const initialState = {
    errors: {},
    values: { title: "", author: "", url: "" },
  };
  const [state, formAction] = useActionState(createBlog, initialState);

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
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>Title</label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={state.values?.title}
          ></input>
          {renderError("title", 0)}
        </div>
        <div>
          <label>Author</label>
          <input
            type="text"
            name="author"
            defaultValue={state.values?.author}
          ></input>
          {renderError("author", 1)}
        </div>
        <div>
          <label>URL</label>
          <input
            type="text"
            name="url"
            defaultValue={state.values?.url}
          ></input>
          {renderError("url", 2)}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewBlog;
