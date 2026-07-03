import { config } from "dotenv";
config({ path: ".env.local" });

const blogList = [
  {
    title: "Becoming a Hacker: Must Read Security & Cyber Crime Books",
    author: "Matt Fay",
    url: "https://javascripttoday.com/blog/becoming-a-hacker-book-list",
    likes: 0,
    userId: 1,
  },
  {
    title: "The Best JavaScript Blogs for Developers in 2025",
    author: "Matthew Warholak",
    url: "https://draft.dev/learn/javascript-blogs",
    likes: 2,
    userId: 2,
  },
  {
    title: "Storing Metadata On Select Option Elements",
    author: "Ben Nadel",
    url: "https://www.bennadel.com/blog/4860-storing-metadata-on-select-option-elements.htm",
    likes: 4,
    userId: 1,
  },
  {
    title: "Image formats: Codecs and compression tools",
    author: "Polina Gurtovaia",
    likes: 3,
    userId: 2,
  },
];

async function fillBlogsTable() {
  const { db } = await import("../db/");
  const { blogs } = await import("@/db/schema");

  const mappedBlogs = blogList.map((blog) => ({
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
    url: blog.url || "",
    user_Id: blog.userId,
  }));

  await db.insert(blogs).values(mappedBlogs);
}

fillBlogsTable().then(() => process.exit(0));
