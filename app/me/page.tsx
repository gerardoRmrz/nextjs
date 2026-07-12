import { getCurrentUser } from "../services/session";

import MyData from "./MyData";
import ReadingList from "./ReadingList";
import ApiToken from "./ApiToken";
import { Suspense } from "react";
import { redirect } from "next/navigation";

const PersonalPage = async () => {
  //
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-start w-2/3 bg-gray-900 pl-5 pr-5 pb-10">
        <Suspense fallback={<p>Loading profile...</p>}>
          <MyData currentUser={user} />
          <hr className="bg-white h-0.5 min-w-full" />
          <ReadingList currentUserId={user.id} />
          <hr className="bg-white h-0.5 min-w-full" />
          <ApiToken />
        </Suspense>
      </div>
    </div>
  );
};

export default PersonalPage;
