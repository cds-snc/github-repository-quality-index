import fs from "fs";
import fetch from "node-fetch";
import path from "path";

const { App } = require("@octokit/app");
const Octokit = require("@octokit/rest");

const getFile = async (file: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) { reject(err); }
      resolve(data);
    });
  });
};

const getKey = async () => {
  const file = path.resolve(__dirname, `../../github.pem`);
  const result = await getFile(file);
  return result;
};

const getInstallationId = async (app: any, name: string) => {

  const jwt = app.getSignedJsonWebToken();

  const response = await fetch(`https://api.github.com/repos/${process.env.ORGANIZATION}/${name}/installation`, {
    headers: {
      authorization: `Bearer ${jwt}`,
      accept: "application/vnd.github.machine-man-preview+json"
    }
  });

  if (response.ok) {
    const data = await response.json();
    return data.id;
  } else {
    throw new Error("Could not get installationId for that repository");
  }
};

export const getClient = async (name: string): Promise<any> => {

  const app = new App({
    id: process.env.ISSUER_ID,
    privateKey: await getKey()
  });

  const installationId = await getInstallationId(app, name);

  const installationAccessToken = await app.getInstallationAccessToken({
    installationId
  });

  const octokit = new Octokit({
    auth: `token ${installationAccessToken}`,
    previews: ["ant-man-preview", "flash-preview"]
  });

  return octokit;
};
