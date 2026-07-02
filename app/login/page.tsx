"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col items-center my-20">
      <h2 className="text-3xl">Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div>
          <label className="custom-label">
            Username
            <input
              type="text"
              name="username"
              required
              className="custom-input"
            />
          </label>
        </div>
        <div>
          <label className="custom-label">
            Password
            <input
              type="password"
              name="password"
              required
              className="custom-input"
            />
          </label>
        </div>
        <button type="submit" className="custom-button text-2xl">
          Login
        </button>
      </form>
    </div>
  );
}
