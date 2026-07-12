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
      confirmPassword: "",
    },
  };

  const [state, formAction] = useActionState(registerUser, initialState);

  console.log("+++++++++++++++>>> ", Object.keys(state.errors));
  const renderError = (key: string, indx: number, testId: string) => {
    if (Object.keys(state.errors).includes(key)) {
      return (
        <p style={{ color: "red" }} data-testid={testId}>
          {Object.values(state.errors)[indx] as string}
        </p>
      );
    }
  };

  return (
    <div className="flex flex-col items-center my-20">
      <h2 className="text-3xl">Register</h2>
      <form action={formAction} className="flex flex-col">
        <div>
          <label className="custom-label">
            Name
            <input
              type="text"
              name="name"
              required
              defaultValue={state.values?.name}
              className="custom-input"
            />
          </label>
        </div>
        <div>
          <label className="custom-label">
            Username
            <input
              type="text"
              name="username"
              required
              defaultValue={state.values?.username}
              className="custom-input"
            />
            {renderError("username", 0, "username-error")}
          </label>
        </div>
        <div>
          <label className="custom-label">
            Password
            <input
              type="password"
              name="password"
              required
              defaultValue={state.values?.password}
              className="custom-input"
            />
            {renderError("password", 1, "")}
          </label>
        </div>
        <div>
          <label className="custom-label">
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              required
              defaultValue={state.values?.confirmPassword}
              className="custom-input"
            />
            {renderError("confirmPassword", 0, "passwordConfirm-error")}
          </label>
        </div>
        {renderError("userExist", 2, "error-message")}
        <button
          type="submit"
          className="custom-button"
          data-testid="register-button"
        >
          Register
        </button>
      </form>
    </div>
  );
}
