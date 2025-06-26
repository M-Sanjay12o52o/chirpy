import { config } from "../config.js";
import type { Request, Response, NextFunction } from "express";

export function middlewareMetricsInc(
  _: Request,
  __: Response,
  next: NextFunction
) {
  console.log("Before: ", config.fileserverHits);
  config.fileserverHits++;
  console.log("After: ", config.fileserverHits);

  next();
}
