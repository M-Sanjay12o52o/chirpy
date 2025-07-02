import express from "express";
import { handlerReadiness } from "./handlers/health.js";
import { handlerMetrics } from "./handlers/no_of_requests.js";
import { handlerReset } from "./handlers/reset.js";
import { middlewareMetricsInc } from "./middlewares/fileServerHits.js";
import { middlewareLogResponses } from "./middlewares/logResponses.js";
// import { handlerValidateChirps } from "./handlers/validate_chirp.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { handleCreateUser } from "./handlers/createUser.js";
import { handleCreateChirps } from "./handlers/createChirps.js";
import { handlerGetChirps } from "./handlers/getChirps.js";
import { handlerGetChirp } from "./handlers/getChirp.js";
import { handleLogin } from "./handlers/login.js";
import { handlerGetUsers } from "./handlers/getUsers.js";
import { handleRefresh } from "./handlers/refresh.js";
import { handleRevoke } from "./handlers/revoke.js";
import { handleUserupdate } from "./handlers/userUpdate.js";

const app = express();
app.use(express.json());
const PORT = 8080;

// app.use(express.static("."));
app.use(middlewareLogResponses);
app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.get("/api/healthz", handlerReadiness);
// app.get("/api/metrics", handlerMetrics);
app.get("/admin/metrics", handlerMetrics);
// app.get("/api/reset", handlerReset);
app.post("/admin/reset", handlerReset);
app.get("/api/users", handlerGetUsers);

// app.post("/api/validate_chirp", handlerValidateChirps);
app.post("/api/users", handleCreateUser);
app.post("/api/chirps", handleCreateChirps);
app.post("/api/login", handleLogin);
app.post("/api/refresh", handleRefresh);
app.post("/api/revoke", handleRevoke);

app.get("/api/chirps", handlerGetChirps);
app.get("/api/chirps/:chirpId", handlerGetChirp);

app.put("/api/users", handleUserupdate);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
