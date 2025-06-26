import type { Request, Response } from "express";
import { config } from "../config.js";

// This should write the number of requests that have been counted as plain text in this format to the HTTP response:
export function handlerMetrics(_: Request, res: Response) {
  // res.send(`Hits: ${config.fileserverHits}`);
  // res.end();
  // `NUM` should be replaced with the number of times the page
  // has been loaded.
  const html = `<html>
    <body>
      <h1>Welcome, Chirpy Admin</h1>
      <p>Chirpy has been visited ${config.fileserverHits} times!</p>
    </body>
  </html>
`;
  res.setHeader("Content-Type", "text/html");
  res.send(html);
}
