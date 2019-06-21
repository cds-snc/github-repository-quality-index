import { getFileContents } from "./getFileContents";

export const hasLicense = async (
  client: any,
  repository: string
): Promise<boolean | null> => {
  try {
    const license = await getFileContents(client, repository, "LICENSE");

    if (license.content) {
      const index = license.content.indexOf("MIT");
      return index !== -1 ? true : null;
    }

    return null;
  } catch (e) {
    console.log("ERR:", e.message);
    return null;
  }
};
