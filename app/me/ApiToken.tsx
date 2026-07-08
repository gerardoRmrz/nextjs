"use client";

import { useActionState, useEffect, useState } from "react";
import { generateToken } from "../actions/users";
import { useSession } from "next-auth/react";

const ApiToken = () => {
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
    <div>
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
  );
};

export default ApiToken;
