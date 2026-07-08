import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  unique,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  likes: integer("likes").notNull().default(0),
  user_Id: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull().default(""),
  token: text("token").notNull(),
});

export const readingLists = pgTable(
  "reading_lists",
  {
    id: serial("id").primaryKey(),
    user_Id: integer("user_id")
      .notNull()
      .references(() => users.id),
    read: boolean("read").default(sql`false`),
    blog_Id: integer("blog_id")
      .notNull()
      .references(() => blogs.id),
  },
  (t) => [unique().on(t.blog_Id, t.user_Id)], // TO AVOID DUPLICATED BLOGS IN READING LIST FOR A USER
);

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
  readingLists: many(readingLists),
}));

export const blogsRelations = relations(blogs, ({ one, many }) => ({
  user: one(users, {
    fields: [blogs.user_Id],
    references: [users.id],
  }),
  readingLists: many(readingLists),
}));

export const readRelations = relations(readingLists, ({ one, many }) => ({
  user: one(users, {
    fields: [readingLists.user_Id],
    references: [users.id],
  }),
  blogs: many(blogs),
}));
