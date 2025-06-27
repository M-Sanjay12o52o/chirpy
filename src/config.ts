process.loadEnvFile();

type DBMigrationConfig = {
  migrationsFolder: string;
};

type DBConfig = {
  url: string;
  migrationConfig: DBMigrationConfig;
};

type AppConfig = {
  fileserverHits: number;
  db: DBConfig;
};

export const config: AppConfig = {
  fileserverHits: 0,
  db: {
    url: process.env.DB_URL!,
    migrationConfig: {
      migrationsFolder: "./src/db/migrations",
    },
  },
};
