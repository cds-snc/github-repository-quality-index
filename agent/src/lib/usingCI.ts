import { getFileContents } from "./getFileContents";

export const usingCI = async (
  client: any,
  repository: string
): Promise<boolean | null> => {
  try {
    const circleCI = await getFileContents(
      client,
      repository,
      ".circleci/config.yml"
    );

    const githubActions = await getFileContents(
      client,
      repository,
      ".github/main.workflow"
    );

    const cloudBuild = await getFileContents(
      client,
      repository,
      "cloudbuild.yaml"
    );

    if (circleCI.content || githubActions.content || cloudBuild.content) {
      return true;
    }

    return false;
  } catch (e) {
    console.log("ERR:", e.message);
    return null;
  }
};
