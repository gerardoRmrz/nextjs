export interface Blog {
  id: number;
  title: string;
  author: string;
  url?: string;
  likes: number;
  userId: number;
}

export type blogWithOutID = Omit<Blog, "id">;

export interface newBlog {
  title: string;
  author: string;
  url?: string;
  likes: number;
}

export type User = {
  username: string;
  name: string;
  passwordHash: string;
};
