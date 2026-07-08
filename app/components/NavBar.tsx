"use client";

import { useSession, signOut } from "next-auth/react";
import Button from "./Button";
import LinkNavBar from "./LinkNavBar";

const NavBar = () => {
  const { data: session } = useSession();

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
          <LinkNavBar href="/me">me</LinkNavBar>
          {" | "}
          <em>{session.user?.name} logged in </em>
          <Button onClick={() => signOut({ redirectTo: "/", redirect: false })}>
            {" "}
            {/* CAMBIAR redirect: false a redirect:true ANTES DE SUBIR A GITHUB */}
            logout
          </Button>
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
