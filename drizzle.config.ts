process.loadEnvFile();
import { defineConfig } from "drizzle-kit";
// import { config } from "./src/config.js";

export default defineConfig({
  schema: "src/db/schema.ts",
  out: "src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    // url: config.db.url,
    // url: "postgres://msanjayachar:@localhost:5432/chirpy",
    url: process.env.DB_URL!,
  },
});
