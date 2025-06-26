import express from "express";
import { handlerReadiness } from "./handlers/health.js";
import { handlerMetrics } from "./handlers/no_of_requests.js";
import { handlerReset } from "./handlers/reset.js";
import { middlewareMetricsInc } from "./middlewares/fileServerHits.js";
import { middlewareLogResponses } from "./middlewares/logResponses.js";
import { handlerValidateChirps } from "./handlers/validate_chirp.js";

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

app.post("/api/validate_chirp", handlerValidateChirps);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
