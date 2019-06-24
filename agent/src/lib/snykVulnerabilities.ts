import cheerio from "cheerio"
import fetch from "node-fetch";

export const snykVulnerabilities = async (name: string): Promise<null|number> => {
  try{  
    const resp = await fetch(`https://snyk.io/test/github/${process.env.ORGANIZATION}/${name}/badge.svg`)
    if (resp.ok) {
      const svg = cheerio.load(await resp.text())
      const vulnerabilities = parseInt(svg('svg').children().last().children().last().text(), 10);
      if (isNaN(vulnerabilities)){
        return null;
      } else {
        return vulnerabilities;
      }
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}