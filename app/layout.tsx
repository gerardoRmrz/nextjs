import Link from "next/link";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link>
          {" | "}
          <Link href="/blogs">blogs</Link>
          {" | "}
          <Link href="/users">users</Link>
          {" | "}
          <Link href="/blogs/new">create new</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
