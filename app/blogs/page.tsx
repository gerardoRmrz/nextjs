import { Blog } from "../types/types";
import Link from "next/link";
import { getBlogs } from "../services/blogs";
const Blogs = () => {
  const blogs = getBlogs();
  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {blogs
          .toSorted((a: Blog, b: Blog) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
              <p>Likes: {blog.likes}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Blogs;
