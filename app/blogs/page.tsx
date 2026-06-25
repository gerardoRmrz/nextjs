const blogs = [
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

const Blogs = () => {
  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {blogs.map((blog, index) => (
          <li key={blog.id}>
            <strong>{blog.author}</strong> {blog.title} {blog.likes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
