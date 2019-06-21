export const isMasterProtected = async (client: any, name: string): Promise<boolean|null> => {
  try {
    const repo = await client.repos.getBranchProtection({
      branch: "master",
      owner: process.env.ORGANIZATION,
      repo: name
    });
    return repo.data.hasOwnProperty("required_pull_request_reviews") ? true : false;
  } catch(e) {
    if(e.status == 404){
      return false;
    } else {
      return null;
    }
  }
};
