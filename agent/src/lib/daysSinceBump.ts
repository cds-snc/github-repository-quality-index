export const daysSinceBump = async (client: any, name: string): Promise<number|boolean|null> => {
  try {
    const repo = await client.pulls.list({
      owner: process.env.ORGANIZATION,
      repo: name,
      state: "all"
    });
    let prs = [];
    let mostRecent = null;
    prLoop:
    for (let p in repo.data) {
      let pr = repo.data[p];
      if (pr.labels.length > 0 ) {
        for (let l in pr.labels) {
          if (pr.labels[l].name == "dependencies") {
            prs.push(pr);
            // compare dates and save the most recent
            if (mostRecent) {
              if (pr.closed_at > mostRecent)
                mostRecent = pr.closed_at;
            } else {
              mostRecent = pr.closed_at;
            }
            continue prLoop;
          }
        }
      }
    }

    // get number of days since mostRecent
    if (mostRecent) {
      return new Date().getDate() - new Date(mostRecent).getDate();
    }
    return false;
  } catch(e) {
    return null;
  }
};