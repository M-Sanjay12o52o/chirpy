import type { Request, Response } from "express";
import { config } from "../config.js";

// This should write the number of requests that have been counted as plain text in this format to the HTTP response:
export function handlerMetrics(_: Request, res: Response) {
  res.send(`Hits: ${config.fileserverHits}`);
  res.end();
}
