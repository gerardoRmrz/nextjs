"use client";

import { useActionState } from "react";
import { generateToken } from "../actions/users";
import { useSession } from "next-auth/react";

const PersonalPage = () => {
  //

  const { data: session } = useSession();

  const [state, formAction] = useActionState(generateToken, {
    errors: "",
    values: {
      user: {
        name: session?.user?.name || "",
        username: session?.user?.email || "",
        token: "",
      },
    },
  });

  if (!session) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-start w-1/2 bg-gray-900 pl-5 pr-5 pb-10">
        <h1 className="text-3xl my-10">My Profile</h1>
        <p className="text-xl">
          <span>
            <strong>Name</strong>:
          </span>{" "}
          {state.values.user?.name}
        </p>
        <p className="text-xl mb-5 mt-3">
          <span>
            <strong>Username</strong>:
          </span>{" "}
          {state.values.user?.username}
        </p>
        <hr className="bg-white h-0.5 min-w-full" />
        <h2 className="text-2xl  my-10">API Token</h2>
        <p>Current Token</p>
        <p className="mt-3">
          <em>{state.values.user?.token}</em>
        </p>
        <form action={formAction} className="mt-2">
          <input type="hidden" name="id"></input>
          <button type="submit" className="custom-button">
            generate token
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalPage;
