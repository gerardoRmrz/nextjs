import { config } from "dotenv";
config({ path: ".env.local" });
import bcrypt from "bcryptjs";

export const setPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};
