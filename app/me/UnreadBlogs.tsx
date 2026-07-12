"use client";

import type { Blog } from "../types/types";
import Link from "next/link";
import { setReadBlog } from "../services/blogs";

const UnreadBlogs = ({
  blogList,
  currentUserId,
}: {
  blogList: (Blog | null)[];
  currentUserId: number | undefined;
}) => {
  //
  const handleClick = async (
    currentUserId: number | undefined,
    blogId: number | undefined,
  ) => {
    if (!currentUserId || !blogId) {
      return null;
    }
    await setReadBlog(currentUserId, blogId);
  };
  //
  if (blogList.length === 0) {
    return null;
  }
  //
  return (
    <ul>
      {blogList.map((blog, index) => (
        <>
          <li key={`li-${index}`}>
            <span key={`span01-${index}`}>
              <Link href={`/blogs/${blog?.id}`}>{blog?.title}</Link>
            </span>
            <span key={`span02-${index}`}>
              <button
                key={`but-${index}`}
                type="button"
                className="custom-green-button"
                data-testId={`mark-read-${index}`}
                onClick={() => handleClick(currentUserId, blog?.id)}
              >
                mark as read
              </button>
            </span>
          </li>{" "}
        </>
      ))}
    </ul>
  );
};

export default UnreadBlogs;
