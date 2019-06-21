import Octokit from "@octokit/rest";

export const getClient = (): any => {
  if (process.env.TOKEN) {
    return new Octokit({
      auth: process.env.TOKEN
    });
  } else {
    return new Octokit();
  }
};
