import { notFound } from "next/navigation";
import { getBlogsById } from "@/app/services/blogs";
import { incrementBlogLikes } from "@/app/actions/blogs";
import LinkNavBar from "@/app/components/LinkNavBar";

const BlogById = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogsById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div className="bg-gray-700 flex flex-col items-center justify-around my-4 h-80">
      <h2 className="text-5xl text-center">{blog.title}</h2>
      <p className="text-3xl">
        <strong>{blog.author}</strong>
      </p>
      <LinkNavBar href={blog.url}>
        <span className="text-2xl">{blog.url}</span>
      </LinkNavBar>
      <p className="text-2xl text-orange-400">Likes: {blog.likes}</p>
      <form action={incrementBlogLikes}>
        <input type="hidden" name="id" value={blog.id}></input>
        <button type="submit" className="custom-button">
          Like
        </button>
      </form>
    </div>
  );
};

export default BlogById;
