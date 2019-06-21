export const numCommits = async (client: any, name: string, numDays: number): Promise<number|null> => {
  try {
    let date= +new Date();
    let pastDate = new Date(date - 1000 * 60 * 60 * 24 * numDays);
    const repo = await client.repos.listCommits({
      owner: process.env.ORGANIZATION,
      repo: name,
      since: pastDate
    });
    return repo.data.length;
  } catch(e) {
    return null;
  }
};
