process.loadEnvFile();

const rawPlatform = process.env.PLATFORM;
if (rawPlatform !== "dev" && rawPlatform !== "prod") {
  throw new Error("Invalid PLATFORM value. Must be 'dev' or 'prod'.");
}

type DBMigrationConfig = {
  migrationsFolder: string;
};

type DBConfig = {
  url: string;
  migrationConfig: DBMigrationConfig;
};

type Platform = "dev" | "prod";

type AppConfig = {
  fileserverHits: number;
  db: DBConfig;
  platform: Platform;
};

export const config: AppConfig = {
  fileserverHits: 0,
  db: {
    url: process.env.DB_URL!,
    migrationConfig: {
      migrationsFolder: "./src/db/migrations",
    },
  },
  platform: rawPlatform,
};
