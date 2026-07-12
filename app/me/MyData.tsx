type User = {
  id: number;
  name: string;
  username: string;
  passwordHash: string;
  token: string;
};

const MyData = async ({ currentUser }: { currentUser: User }) => {
  return (
    <div data-testId="user-profile">
      <h1 className="text-3xl my-10">My Profile</h1>
      <p className="text-xl" data-testId="user-name">
        <span>
          <strong>Name</strong>:
        </span>{" "}
        {currentUser?.name}
      </p>
      <p className="text-xl mb-5 mt-3" data-testId="user-username">
        <span>
          <strong>Username</strong>:
        </span>{" "}
        {currentUser?.username}
      </p>
    </div>
  );
};

export default MyData;
