import { getBlogs } from "../services/blogs";
const Blogs = () => {
  const blogs = getBlogs();
  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {blogs.map((blog, index) => (
          <li key={blog.id}>
            <strong>{blog.author}</strong> {blog.title} {blog.likes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
