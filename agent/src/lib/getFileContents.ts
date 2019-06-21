export const getFileContents = async (
  client: any,
  repository: string,
  filename: String
): Promise<{ content: string }> => {
  let payload = { content: "" };

  try {
    const result = await client.repos.getContents({
      owner: process.env.ORGANIZATION,
      repo: repository,
      path: filename
    });

    if (result && result.data && result.data.content) {
      const content = Buffer.from(result.data.content, "base64").toString();
      payload = { content };
    }
  } catch (e) {
    // catch if file isn't found
    console.log(`${e.message} ${filename}`);
  }

  return payload;
};

module.exports.getFileContents = getFileContents;
