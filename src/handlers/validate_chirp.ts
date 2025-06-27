// import type { NextFunction, Request, Response } from "express";
// import { respondWithError, respondWithJSON } from "../api/json.js";
// import { profaneRemove } from "../helper/profane.js";
// import { BadRequestError } from "../customErrors.js";

// export function handlerValidateChirps(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const { body } = req.body;

//     console.log("body value:", body, "typeof:", typeof body);

//     if (typeof body !== "string") {
//       // throw new Error("Invalid body type");
//       throw new Error("Something went wrong on our end");
//     }

//     if (body.length > 140) {
//       // throw new Error("Chirp is too long");
//       throw new BadRequestError("Chirp is too long. Max length is 140");
//     }

//     const cleanedBody = profaneRemove(body);

//     res.status(200).json({ cleanedBody });
//   } catch (error) {
//     next(error);
//   }

//   // const { body } = req.body;
//   // let clearnedBody;
//   // // Using app.use(express.json());
//   // if (typeof body !== "string") {
//   //   res.status(400).json({
//   //     error: "Something went wrong",
//   //   });
//   // }
//   // if (body.length > 140) {
//   //   res.status(400).json({
//   //     error: "Chirp is too long",
//   //   });
//   // } else {
//   //   clearnedBody = profaneRemove(body);
//   // }
//   // res.status(200).send({
//   //   // valid: true,
//   //   cleanedBody: clearnedBody,
//   // });
//   // Without depending on
//   // app.use(express.json());
//   // type parameters = {
//   //   body: string;
//   // };
//   // let body = "";
//   // req.on("data", (chunk) => {
//   //   body += chunk;
//   // });
//   // let params: parameters;
//   // req.on("end", () => {
//   //   try {
//   //     params = JSON.parse(body);
//   //   } catch (error) {
//   //     respondWithError(res, 400, "Invalid JSON");
//   //     return;
//   //   }
//   //   const maxChirpLength = 140;
//   //   if (params.body.length > maxChirpLength) {
//   //     respondWithError(res, 400, "Chirp is too long");
//   //     return;
//   //   } else {
//   //     profaneRemove(params.body);
//   //   }
//   //   respondWithJSON(res, 200, {
//   //     valid: true,
//   //     // cleanedBody: params.body,
//   //   });
//   // });
// }
