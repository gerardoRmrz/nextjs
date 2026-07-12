"use client";
import type { Blog } from "../types/types";

import Link from "next/link";

const BlogItem = ({ blog }: { blog: Blog }) => {
  return (
    <>
      <li>
        <div className="bg-gray-900 my-2">
          <Link href={`/blogs/${blog.id}`} className="list-item">
            {blog.title}
          </Link>
          <p>{blog.likes} likes</p>
        </div>
      </li>
    </>
  );
};

export default BlogItem;
