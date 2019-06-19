import Octokit from "@octokit/rest";

export const getClient = (): Octokit => {
  return new Octokit({
    auth: process.env.TOKEN
  });
};
