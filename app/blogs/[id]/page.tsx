import { notFound } from "next/navigation";
import { getBlogsById } from "@/app/services/blogs";
import { getCurrentUser } from "@/app/services/session";
import LinkNavBar from "@/app/components/LinkNavBar";
import LikesAndReadingListForm from "./LikesAndReadingListForm";

const BlogById = async ({ params }: { params: Promise<{ id: string }> }) => {
  const currentUser = await getCurrentUser();
  const { id } = await params;
  const { blogs: blog, reading_lists } = await getBlogsById(Number(id));
  if (!blog) {
    notFound();
  }
  const isInReadingList =
    reading_lists?.read && reading_lists?.user_Id === currentUser?.id;
  return (
    <div
      className="bg-gray-700 flex flex-col items-center justify-around my-4 h-80"
      data-testId="blog-detail"
    >
      <h2 className="text-3xl text-center" data-testId="blog-title">
        {blog.title}
      </h2>
      <p className="text-2xl" data-testId="blog-author">
        <strong>{blog.author}</strong>
      </p>
      <LinkNavBar href={blog.url}>
        <span className="text-2xl">{blog.url}</span>
      </LinkNavBar>
      <p className="text-2xl text-orange-400">Likes: {blog.likes}</p>
      <LikesAndReadingListForm
        isInReadingList={isInReadingList}
        blogId={blog.id}
      />
    </div>
  );
};

export default BlogById;
