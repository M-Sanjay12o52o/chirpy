// - [x] Create and mount an error-handling middleware that responds
// with `500` for unhandled errors.

import { NextFunction, Request, Response } from "express";
import { CustomError } from "../customErrors.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }

  console.log(`Global error: ${err}`);

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  // res.status(500).json({
  //   error: "Something went wrong on our end",
  // });
  // return;

  res.status(401).json({
    error: "Something went wrong on our end",
  });
  return;
}

// - [x] It should log the error using `console.log` and return a JSON response.

// - [x] Handle errors in your async route handlers using `try/catch` or
// `.catch(next)`.

// - [x] If a chirp is too long, throw an error in the route handler.
// Test that your error-handling middleware catches it.
// The generic error `Something went wrong on our end` is fine for now.
