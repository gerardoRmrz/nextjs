export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import BlogItem from "@/app/components/BlogItem";

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
      <h2 className="text-4xl my-2">{user.name}</h2>
      <ul>
        {user.blogs?.map((blog) => (
          <BlogItem blog={blog} key={blog.id}></BlogItem>
        ))}
      </ul>
    </div>
  );
};

export default User;
