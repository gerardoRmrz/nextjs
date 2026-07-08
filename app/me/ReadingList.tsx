import { getReadingList } from "../services/blogs";
import Link from "next/link";

type User = {
  id: number;
  name: string;
  username: string;
  passwordHash: string;
  token: string;
};

const ReadingList = async ({ currentUser }: { currentUser: User }) => {
  const readingList = await getReadingList(currentUser.id);
  return (
    <div>
      <h2 className="text-2xl  my-10">Reading List</h2>
      <ul>
        {readingList.map((item) => (
          <li key={item.reading_lists?.id}>
            <Link href={`/blogs/${item.blogs?.id}`} className="list-item">
              {item.blogs?.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadingList;
