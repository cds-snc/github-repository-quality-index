async function asyncForEach(array: any, callback: any) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const reviews = async (client: any, name: string): Promise<number|null> => {
  try {

    const q = `repo:${process.env.ORGANIZATION}/${name} is:merged is:pr`
    const result = await client.search.issuesAndPullRequests({
      per_page: 10,
      q
    });

    const total = result.data.total_count
    
    if (total < 1) {
      return 0;
    }

    let reviewed = 0

    await asyncForEach(result.data.items, async (item: any) => {
      const reviews = await client.pulls.listReviewRequests({
        owner: process.env.ORGANIZATION,
        pull_number: item.number,
        repo: name
      });
      if (reviews.data.users.length > 0) {
        reviewed++;
      }
    })
    return (reviewed / total) * 100;
  } catch(e) {
    return null;
  }
};
