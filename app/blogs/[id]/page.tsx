import { notFound } from "next/navigation";
import { getBlogsById } from "@/app/services/blogs";
import { incrementBlogLikes } from "@/app/actions/blogs";

const BlogById = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogsById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
        <strong>{blog.author}</strong>
      </p>
      <p>Likes: {blog.likes}</p>
      <form action={incrementBlogLikes}>
        <input type="hidden" name="id" value={blog.id}></input>
        <button type="submit">Like</button>
      </form>
    </div>
  );
};

export default BlogById;
