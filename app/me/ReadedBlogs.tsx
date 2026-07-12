import type { Blog } from "../types/types";
import Link from "next/link";

const ReadBlogs = ({ blogList }: { blogList: (Blog | null)[] }) => {
  return (
    <ul>
      {blogList.map((blog) => (
        <li key={blog?.id} data-testId="no-unread-blogs">
          {blog?.title}
        </li>
      ))}
    </ul>
  );
};

export default ReadBlogs;
