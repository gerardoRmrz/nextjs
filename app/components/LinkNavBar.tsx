"use client";
import Link from "next/link";

const LinkNavBar = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link href={href} className="bg-gray-800 rounded hover:bg-blue-500">
      {children}
    </Link>
  );
};

export default LinkNavBar;
