import { getCurrentUser } from "../services/session";

import MyData from "./MyData";
import ReadingList from "./ReadingList";
import ApiToken from "./ApiToken";

const PersonalPage = async () => {
  //
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-start w-2/3 bg-gray-900 pl-5 pr-5 pb-10">
        <MyData currentUser={user} />
        <hr className="bg-white h-0.5 min-w-full" />
        <ReadingList currentUser={user} />
        <hr className="bg-white h-0.5 min-w-full" />
        <ApiToken />
      </div>
    </div>
  );
};

export default PersonalPage;
