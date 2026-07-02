import { getCurrentUser } from "./services/session";

export default async function Home() {
  const user = await getCurrentUser();
  return (
    <div className="flex flex-col items-center my-50">
      <h1 className="text-6xl my-5">BLOGS APP</h1>
      <h2 className="text-2xl">
        Welcome <strong className="text-amber-600">{user?.name}</strong>
      </h2>
    </div>
  );
}
