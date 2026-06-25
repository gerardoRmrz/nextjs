interface Blog {
  id: number;
  title: string;
  author: string;
  url?: string;
  likes: number;
}

interface newBlog {
  title: string;
  author: string;
  url?: string;
  likes: number;
}

const blogs: Blog[] = [
  {
    id: 1,
    title: "Becoming a Hacker: Must Read Security & Cyber Crime Books",
    author: "Matt Fay",
    url: "https://javascripttoday.com/blog/becoming-a-hacker-book-list",
    likes: 0,
  },
  {
    id: 2,
    title: "The Best JavaScript Blogs for Developers in 2025",
    author: "Matthew Warholak",
    url: "https://draft.dev/learn/javascript-blogs",
    likes: 2,
  },
  {
    id: 3,
    title: "Storing Metadata On Select Option Elements",
    author: "Ben Nadel",
    url: "https://www.bennadel.com/blog/4860-storing-metadata-on-select-option-elements.htm",
    likes: 4,
  },
  {
    id: 4,
    title: "Image formats: Codecs and compression tools",
    author: "Polina Gurtovaia",
    likes: 3,
  },
];

export const getBlogs = () => {
  return blogs;
};

export const getBlogsById = (id: string) => {
  const filteredBlog = blogs.find((blog) => blog.id === Number(id));
  return filteredBlog;
};

export const addNewBlog = (newBlog: newBlog) => {
  const newBlogWithId = { id: blogs.length + 1, ...newBlog };
  console.log(newBlogWithId);
  blogs.push(newBlogWithId);
};

export const incrementLikes = (id: number) => {
  const blogToUpdate = blogs.find((blog) => blog.id === id);
  if (blogToUpdate) {
    blogToUpdate.likes = blogToUpdate.likes + 1;
  }
};
