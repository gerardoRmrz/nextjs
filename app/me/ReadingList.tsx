import { getReadingList } from "../services/blogs";
import { markAsRead } from "../actions/blogs";
import Link from "next/link";

const ReadingList = async ({ currentUserId }: { currentUserId: number }) => {
  console.log("//////////////////>> ", currentUserId);
  const readingList = await getReadingList(currentUserId);
  const unreadList = readingList.filter((blog) => !blog.reading_lists.read);
  const readList = readingList.filter((blog) => blog.reading_lists.read);

  const renderList = (blogsList: typeof readingList, markButton: boolean) => (
    <ul>
      {blogsList.map((item) => (
        <li key={item.reading_lists?.id} className="flex justify-between mb-3">
          <Link href={`/blogs/${item.blogs?.id}`} className="list-item">
            {item.blogs?.title}
          </Link>
          {markButton ? (
            <form action={markAsRead}>
              <input type="hidden" value={item.blogs?.id} name="blogId"></input>
              <input type="hidden" value={currentUserId} name="UserId"></input>
              <button type="submit" className="custom-green-button">
                mark as read
              </button>
            </form>
          ) : null}
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <h2 className="text-2xl  my-6">Reading List</h2>
      <h3 className="mb-5">Unread ({unreadList.length})</h3>
      {renderList(unreadList, true)}
      <h3 className="mb-5">Read ({readList.length})</h3>
      {renderList(readList, false)}
    </div>
  );
};

export default ReadingList;
