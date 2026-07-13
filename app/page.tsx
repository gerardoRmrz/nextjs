export const dynamic = "force-dynamic";
import { getCurrentUser } from "./services/session";
import Homepage from "@/markdown/homepage.mdx";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <>
      <section className="header">
        <h1 className="text-6xl font-bold my-5">BLOGS APP</h1>
        <h2 className="text-2xl">
          Welcome <strong className="text-amber-600">{user?.name}</strong>
        </h2>
      </section>
      <section className="markdown">
        <Homepage />
      </section>
    </>
  );
}
