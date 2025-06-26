import type { Request, Response } from "express";
import { respondWithError, respondWithJSON } from "../api/json.js";
import { profaneRemove } from "../helper/profane.js";

export function handlerValidateChirps(req: Request, res: Response) {
  const { body } = req.body;

  let clearnedBody;

  // Using app.use(express.json());
  if (typeof body !== "string") {
    res.status(400).json({
      error: "Something went wrong",
    });
  }

  if (body.length > 140) {
    res.status(400).json({
      error: "Chirp is too long",
    });
  } else {
    clearnedBody = profaneRemove(body);
  }
  res.status(200).send({
    // valid: true,
    cleanedBody: clearnedBody,
  });
  // Without depending on
  // app.use(express.json());
  // type parameters = {
  //   body: string;
  // };
  // let body = "";
  // req.on("data", (chunk) => {
  //   body += chunk;
  // });
  // let params: parameters;
  // req.on("end", () => {
  //   try {
  //     params = JSON.parse(body);
  //   } catch (error) {
  //     respondWithError(res, 400, "Invalid JSON");
  //     return;
  //   }
  //   const maxChirpLength = 140;
  //   if (params.body.length > maxChirpLength) {
  //     respondWithError(res, 400, "Chirp is too long");
  //     return;
  //   } else {
  //     profaneRemove(params.body);
  //   }
  //   respondWithJSON(res, 200, {
  //     valid: true,
  //     // cleanedBody: params.body,
  //   });
  // });
}
