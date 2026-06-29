import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const blogsDB = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  likes: integer("likes").notNull().default(0),
});
