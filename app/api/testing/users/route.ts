import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  /* if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  } */

  const {
    username,
    name,
    password,
  }: { username: string; name: string; password: string } = await req.json();

  try {
    if (!username || !name || !password) {
      return NextResponse.json(
        { error: "The data is incomplete" },
        { status: 400 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const token = "";

    await db.insert(users).values({ username, name, passwordHash, token });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
