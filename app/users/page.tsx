import { getUsers } from "../services/users";
import UserItem from "../components/UserItem";

const Users = async () => {
  const users = await getUsers();

  return (
    <div>
      <h1 className="text-4xl">Users</h1>
      <ul>
        {users.map((user) => (
          <UserItem user={user} key={user.id}></UserItem>
        ))}
      </ul>
    </div>
  );
};

export default Users;
