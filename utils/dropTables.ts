import { config } from "dotenv";
config({ path: ".env.local" });
import { sql } from "drizzle-orm";
import { execSync } from "node:child_process";

const deleteDB = async () => {
  const { db } = await import("@/db/");
  const { blogs, users, readingLists } = await import("@/db/schema");

  console.log("Dropping tables blogs, users, readingList");

  execSync("rm -rf ./drizzle", { stdio: "inherit" });

  db.execute(
    sql`DROP TABLE IF EXISTS drizzle.__drizzle_migrations CASCADE;`,
  ).then(() => {});
  db.execute(sql`DROP TABLE IF EXISTS ${blogs} CASCADE;`).then(() => {});
  db.execute(sql`DROP TABLE IF EXISTS ${users} CASCADE;`).then(() => {});
  db.execute(sql`DROP TABLE IF EXISTS ${readingLists} CASCADE`).then(() => {});
};

export async function dropTables() {
  await deleteDB();
}

dropTables();
