"use client";
import { MouseEventHandler } from "react";
const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
