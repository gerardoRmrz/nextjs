//run with:  npx tsx ./utils/fillUsersTable.ts
import { config } from "dotenv";
config({ path: ".env.local" });
import { setPassword } from "./set-password";

const generateUsersList = async () => {
  return [
    {
      name: "Mariano Azuela",
      username: "marAz",
      passwordHash: await setPassword("jsdjnegs"),
    },
    {
      name: "William Shakespeare",
      username: "willShak",
      passwordHash: await setPassword("9784hau293"),
    },
    {
      name: "Robert Kappa",
      username: "robKap",
      passwordHash: await setPassword("28jsghas0"),
    },
    {
      name: "Akira Kurosawa",
      username: "akirKu",
      passwordHash: await setPassword("2947sjvaop"),
    },
    {
      name: "Emiliano Zapata",
      username: "emiZap",
      passwordHash: await setPassword("ñ,xcbn623"),
    },
    {
      name: "Gibran Khalil Gibran",
      username: "gibKhagi",
      passwordHash: await setPassword("kam36c.l@"),
    },
    {
      username: "lucasLu",
      name: "Lucas Lucatero",
      passwordHash: await setPassword("abcd.2367"),
    },
    {
      username: "juanRulfo",
      name: "Juan Rulfo",
      passwordHash: await setPassword("LlanoLlamas.1953"),
    },
  ];
};

export async function fillUsersTable() {
  const { db } = await import("@/db/");
  const { users } = await import("@/db/schema");
  const usersList = await generateUsersList();

  const mappedUsers = usersList.map((user) => ({
    username: user.username,
    name: user.name,
    passwordHash: user.passwordHash,
    token: "",
  }));

  await db.insert(users).values(mappedUsers);
}

fillUsersTable().then(() => process.exit(0));
