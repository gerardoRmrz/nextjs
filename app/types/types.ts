export interface Blog {
  id: number;
  title: string;
  author: string;
  url?: string;
  likes: number;
}

export interface newBlog {
  title: string;
  author: string;
  url?: string;
  likes: number;
}
