import { getFileContents } from "./getFileContents";

const hasValue = (content: string, value: string): boolean => {
  const index = content.indexOf(value);

  if (index !== -1) {
    return true;
  }

  return false;
};

export const hasSecurityMd = async (
  client: any,
  repository: string
): Promise<boolean | null> => {
  try {
    const securityMd = await getFileContents(client, repository, "security.md");

    if (securityMd.content) {
      const content = securityMd.content;

      if (
        hasValue(content, "Disclosure policy") &&
        hasValue(content, "Security Update policy") &&
        hasValue(content, "Security related configuration") &&
        hasValue(content, "Known security gaps & future enhancements")
      ) {
        return true;
      }

      return null;
    }

    return null;
  } catch (e) {
    console.log("ERR:", e.message);
    return null;
  }
};
