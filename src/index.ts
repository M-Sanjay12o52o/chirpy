import express from "express";
import { handlerReadiness } from "./handlers/health.js";
import { handlerMetrics } from "./handlers/no_of_requests.js";
import { handlerReset } from "./handlers/reset.js";
import { middlewareMetricsInc } from "./middlewares/fileServerHits.js";
import { middlewareLogResponses } from "./middlewares/logResponses.js";

const app = express();
const PORT = 8080;

// app.use(express.static("."));
app.use(middlewareLogResponses);
app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.get("/healthz", handlerReadiness);
app.get("/metrics", handlerMetrics);
app.get("/reset", handlerReset);

app.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});
