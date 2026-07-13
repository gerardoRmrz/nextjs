export const dynamic = "force-dynamic";
import { Suspense } from "react";
import Search from "../ui/search";
import { getBlogs } from "../services/blogs";

import BlogItem from "../components/BlogItem";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter: string }>;
}) => {
  const { filter } = await searchParams;

  const blogs = await getBlogs(filter);

  return (
    <div>
      <h2 className="text-4xl">blogs</h2>
      <Search />
      <Suspense fallback={<p>Loading blogs...</p>}>
        <ul data-testId="blogs-list">
          {blogs.map((blog) => (
            <BlogItem blog={blog} key={blog.id} />
          ))}
        </ul>
      </Suspense>
    </div>
  );
};

export default Blogs;
