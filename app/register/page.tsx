"use client";

import { registerUser } from "../actions/users";
import { useActionState } from "react";

export default function RegisterPage() {
  const initialState = {
    errors: {},
    values: {
      name: "",
      username: "",
      password: "",
    },
  };

  const [state, formAction] = useActionState(registerUser, initialState);

  const renderError = (key: string, indx: number) => {
    if (Object.keys(state.errors).includes(key)) {
      return (
        <p style={{ color: "red" }}>
          {Object.values(state.errors)[indx] as string}
        </p>
      );
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              required
              defaultValue={state.values?.username}
            />
            {renderError("username", 0)}
          </label>
        </div>
        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              required
              defaultValue={state.values?.name}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              defaultValue={state.values?.password}
            />
            {renderError("password", 1)}
          </label>
        </div>
        {renderError("userExist", 2)}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
