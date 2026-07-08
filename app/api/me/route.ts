import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users, blogs } from "@/db/schema";

type CreatedBlogs = {
  author: string;
  title: string;
  url: string;
};

type Response = {
  id: number;
  name: string;
  username: string;
  createdBlogs: CreatedBlogs;
};

const parseResponse = (resp: Response[]) => {
  const blogList = resp.reduce((acc: CreatedBlogs[], curr: Response) => {
    return acc.concat(curr.createdBlogs);
  }, []);

  return {
    id: resp[0].id,
    name: resp[0].name,
    username: resp[0].name,
    createdBlogs: blogList,
  };
};

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db
    .select({
      id: users.id,
      username: users.username,
      name: users.name,
      createdBlogs: {
        author: blogs.author,
        title: blogs.title,
        url: blogs.url,
      },
    })
    .from(users)
    .innerJoin(blogs, eq(users.id, blogs.user_Id))
    .where(eq(users.token, token));

  if (user.length === 0) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(parseResponse(user));
};
