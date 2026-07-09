import { getUsers } from "../services/users";
import UserItem from "../components/UserItem";
import { Suspense } from "react";
const Users = async () => {
  const users = await getUsers();

  return (
    <div>
      <h1 className="text-4xl">Users</h1>
      <Suspense fallback={<p>Loading users...</p>}>
        <ul>
          {users.map((user) => (
            <UserItem user={user} key={user.id}></UserItem>
          ))}
        </ul>
      </Suspense>
    </div>
  );
};

export default Users;
