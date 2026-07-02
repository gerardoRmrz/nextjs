export interface Blog {
  id: number;
  title: string;
  author: string;
  url?: string;
  likes: number;
  user_Id: number;
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
