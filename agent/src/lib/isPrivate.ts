export const isPrivate = async (client: any, name: string): Promise<boolean|null> => {
  try {
    const repo = await client.repos.get({
      owner: process.env.ORGANIZATION,
      repo: name
    });
    return repo.data.private;
  } catch(e) {
    return null;
  }
};
