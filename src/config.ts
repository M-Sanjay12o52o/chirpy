process.loadEnvFile();

// this will hold any stateful, in-memory data we'll need to keep track of. In our case we only need to keep track of the number of requests
// we've received.
type APIConfig = {
  fileserverHits: number;
  dbURL: string;
};

// - [ ] Create a `config` object in `src/config.ts` that will hold the stateful data. Import this config wherever you need to access or modify the state.
export const config: APIConfig = {
  fileserverHits: 0,
  dbURL: process.env.DB_URL!,
};
