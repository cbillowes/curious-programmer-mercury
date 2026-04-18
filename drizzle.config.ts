import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: "./.env" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.NETLIFY_DATABASE_URL!,
  },
});
