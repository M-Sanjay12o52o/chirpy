import express from "express";
import { handlerReadiness } from "./handlers/health.js";
const app = express();
const PORT = 8080;
// app.use(express.static("."));
app.use("/app", express.static("./src/app"));
// handlerReadiness -> this is the handler function
// Handler should use various methods of the response object to do the following:
// 1. Add the Readiness Endpoint
// app.get("/healthz", handlerReadiness);
// - [x] Set the Content-Type header using .set
// - [x] Send the body text using .send
app.get("/healthz", handlerReadiness);
app.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});
// 2. Update the Static Files Path
// - [x] Use the `express.static` middleware alongside `app.use` to mount the `/app` path,
// making sure the request paths get handled correctly.
// - [x] create a new `src/app` directory and move the `index.html` file there.
// - [x] move the `assets` directoory into the `src/app` directory
// - [ ] Ensure the server handles requests for both the readiness endpoint and static files correctly.
