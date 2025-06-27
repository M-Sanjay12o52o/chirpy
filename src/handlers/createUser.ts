import type { Request, Response } from "express";
import { config } from "../config.js";
import { createUser } from "../db/queries/users.js";

/*
QUESTIONS:

1. How to make this handler expect and `email` as json in the request
body.

2. How to make this return 
User's ID, email, and timestamps in the response body.;
*/

// - [ ] Add a new endpoint to your server `POST /api/users` that allows users to be created. It accpets an `email` as JSON in the request body and returns the user's ID, email, and timestamps in the respone body.
export async function handleCreateUser(req: Request, res: Response) {
  const user = req.body;

  console.log("user: ", user);

  let result = await createUser(user);

  res.status(201).json(result);
}

// RESPONSE:
// HTTP 201 Created
/*
{
  "id": "50746277-23c6-4d85-a890-564c0044c2fb",
  "createdAt": "2021-07-07T00:00:00Z",
  "updatedAt": "2021-07-07T00:00:00Z",
  "email": "user@example.com"
}
*/
