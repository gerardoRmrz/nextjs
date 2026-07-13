import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users, blogs, readingLists } from "@/db/schema";

export const DELETE = async (req: NextRequest) => {
  /* if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  } */
  try {
    await db.delete(readingLists);
    await db.delete(blogs);
    await db.delete(users);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
