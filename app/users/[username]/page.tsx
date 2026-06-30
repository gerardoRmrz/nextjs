import { notFound } from "next/navigation";
import Link from "next/link";

import { getByUserName } from "@/app/services/users";

const User = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;

  const user = await getByUserName(username);

  if (!user) {
    notFound();
  }
  console.log(user.blogs);
  return (
    <div>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs?.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
