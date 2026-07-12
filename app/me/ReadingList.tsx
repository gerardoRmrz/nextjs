import { getReadingList } from "../services/blogs";

import ReadedBlogs from "./ReadedBlogs";
import UnreadBlogs from "./UnreadBlogs";

const ReadingList = async ({ currentUserId }: { currentUserId: number }) => {
  const readingList = await getReadingList(currentUserId);
  const unreadList = readingList
    .filter((item) => !item.reading_lists.read)
    .map((item) => item.blogs);
  const readList = readingList
    .filter((item) => item.reading_lists.read)
    .map((item) => item.blogs);
  console.log("readList ++++++>", { ...readList });
  return (
    <div data-testId="reading-list-section">
      <h2 className="text-2xl  my-6" data-testId="empty-reading-list">
        Reading List
      </h2>
      <h3 className="mb-5">Unread ({unreadList.length})</h3>
      <section data-testId="unread-section">
        <UnreadBlogs
          blogList={unreadList}
          currentUserId={currentUserId}
        ></UnreadBlogs>
      </section>
      <h3 className="mb-5">Read ({readList.length})</h3>
      <ReadedBlogs blogList={readList}></ReadedBlogs>
    </div>
  );
};

export default ReadingList;
