import type { NextFunction, Request, Response } from "express";

// - [x] Create a middleware function called `middlewareLogResponses` that matches the function signature for middleware in express.
export const middlewareLogResponses = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // - [x] Within the function use the `Response` objects `.on` method.
  // This method allows you to listen for events on the response object.
  // Listen for the `finish` event.

  res.on("finish", () => {
    if (res.statusCode !== 200) {
      console.log(
        `[NON-OK] ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`
      );
    }
  });
  next();
};

// - [x] Grab the status code from the response object.
// - [x] If the status code is non-OK, log the following to the console.
// [NON-OK] <http_method> <url> - Status: <status_code>
// We need to replace these with actual values. We can get these with `method` and `url` properties on the `Request` object.

// - [x] Use the middleware at the application level. Since it's subscribing to all `finish` events, it doesn't matter where you set it.

// - [ ] Run the server and `tee` the output (copies the stdout) to a new file called `server.log` (and `.gitignore` the log).
// npm run dev | tee server.log
