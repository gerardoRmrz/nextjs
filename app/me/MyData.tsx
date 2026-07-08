type User = {
  id: number;
  name: string;
  username: string;
  passwordHash: string;
  token: string;
};

const MyData = async ({ currentUser }: { currentUser: User }) => {
  return (
    <>
      <h1 className="text-3xl my-10">My Profile</h1>
      <p className="text-xl">
        <span>
          <strong>Name</strong>:
        </span>{" "}
        {currentUser?.name}
      </p>
      <p className="text-xl mb-5 mt-3">
        <span>
          <strong>Username</strong>:
        </span>{" "}
        {currentUser?.username}
      </p>
    </>
  );
};

export default MyData;
