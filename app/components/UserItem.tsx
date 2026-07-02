"use client";
import Link from "next/link";

const UserItem = ({
  user,
}: {
  user: {
    id: number;
    name: string;
    username: string;
    passwordHash: string;
  };
}) => {
  return (
    <li>
      <div className="bg-gray-900 my-2">
        <Link href={`/users/${user.username}`} className="list-item">
          {user.name}
        </Link>
      </div>
    </li>
  );
};

export default UserItem;
