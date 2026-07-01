"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();

  if (!session) {
    console.log("NO SESSION!!!");
  } else {
    console.log("NAVBAR: =====>", session);
  }

  return (
    <nav>
      <Link href="/">Home</Link>
      {" | "}
      <Link href="/blogs">blogs</Link>
      {" | "}
      <Link href="/users">users</Link>
      {" | "}
      {session ? (
        <>
          <Link href="/blogs/new">create new</Link>
          {" | "}
          <em>{session.user?.name} logged in </em>
          <button onClick={() => signOut()}>logout</button>
        </>
      ) : (
        <>
          <Link href="/login">login</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
