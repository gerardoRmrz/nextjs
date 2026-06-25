import { notFound } from "next/navigation";
import { getBlogsById } from "@/app/services/blogs";

const BlogById = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = getBlogsById(id);

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
    </div>
  );
};

export default BlogById;
