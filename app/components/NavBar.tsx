"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Button from "./Button";
import LinkNavBar from "./LinkNavBar";

const NavBar = () => {
  const { data: session } = useSession();

  if (!session) {
    console.log("NO SESSION!!!");
  } else {
    console.log("NAVBAR: =====>", session);
  }

  return (
    <nav className="bg-gray-800 text-white text-xl px-6 py-3 flex items-center gap-4">
      <LinkNavBar href="/">Home</LinkNavBar>
      {" | "}
      <LinkNavBar href="/blogs">blogs</LinkNavBar>
      {" | "}
      <LinkNavBar href="/users">users</LinkNavBar>
      {" | "}
      {session ? (
        <>
          <LinkNavBar href="/blogs/new">create new</LinkNavBar>
          {" | "}
          <em>{session.user?.name} logged in </em>
          <Button onClick={() => signOut()}>logout</Button>
        </>
      ) : (
        <>
          <LinkNavBar href="/login">login</LinkNavBar>
          {" | "}
          <LinkNavBar href="/register">register</LinkNavBar>
        </>
      )}
    </nav>
  );
};

export default NavBar;
