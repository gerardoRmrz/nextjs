const NewBlog = () => {
  return (
    <div>
      <h2>Create a new blog</h2>
      <form>
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
      </form>
    </div>
  );
};

export default NewBlog;
