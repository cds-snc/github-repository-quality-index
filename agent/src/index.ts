import * as dotenv from "dotenv";
import express from "express";

import { getClient, isPrivate, reviews } from "./lib";
import { numCommits } from "./lib/numCommits";

dotenv.config();

export const app: express.Application = express();

const port: number = parseInt(process.env.PORT, 10) || 3000;

app.get(`/:repository`, async (req: express.Request, res: express.Response): Promise<void> => {

  const repository = req.params.repository;
  const client = getClient();
  const metrics = {
    isPrivate: await isPrivate(client, repository),
    numCommits: await numCommits(client, repository, 60),
    organization: process.env.ORGANIZATION,
    repository,
    reviews: await reviews(client, repository)
  };

  res.status(200).send(metrics);
});

app.listen(port, (err: Error) => {
  if (err) {throw err; }
  console.log(`> Ready on http://localhost:${port}`);
});