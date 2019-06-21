export const snykInstalled = async (client: any, name: string): Promise<boolean|null> => {
  try {

    const q = `repo:${process.env.ORGANIZATION}/${name} is:merged is:pr`
    const result = await client.search.issuesAndPullRequests({
      per_page: 1,
      q
    });
    
    if (result.data.total_count < 1) {
      return false;
    }

    const last_merge = result.data.items[0]
    const last_pull_request = await client.pulls.get({
      owner: process.env.ORGANIZATION,
      pull_number: last_merge.number,
      repo: name
    })

    const statuses = await client.repos.listStatusesForRef({
      owner: process.env.ORGANIZATION,
      ref: last_pull_request.data.head.sha,
      repo: name
    })

    let snykInstalled = false;

    statuses.data.forEach((status: any) => {
      if (status.context.includes("snyk")){
        snykInstalled = true;
      }
    })
    
    return snykInstalled;
  } catch(e) {
    return null;
  }
};
