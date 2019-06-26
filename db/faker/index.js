const fs = require("fs");

const repos = [
  "digital-canada-ca",
  "service-dashboard",
  "laptop",
  "non-dev-laptop",
  "e-briefing-service",
  "energuide",
  "gcui",
  "common-assets",
  "dmi-tcat",
  "docker-aws-cli",
  "html-proofer-docker",
  "e-briefing-app",
  "ircc",
  "ircc_scheduler",
  "nrcan_poc",
  "pulse",
  "ircc-rescheduler",
  "vac-data",
  "domain-scan",
  "aws-ecs-fargate",
  "track-web",
  "tracker",
  "track-web-security-compliance",
  "ITSG-33-baselines",
  "ITSG-33-definitions",
  "vac-find-benefits-and-services-documentation",
  "dns",
  "take-screenshots",
  "simplify-privacy-statements",
  "show-the-platform",
  "observability-demo",
  "netlify-serverless-oauth2-backend",
  "mrpinchy-confession-box",
  "report-a-cybercrime",
  "terraform-gke",
  "security-goals",
  "bundle-size-tracker",
  "bundle-size-charter",
  "bundle-size-tracker-demo-app",
  "tti-tools-tracker",
  "lighthouse-scanner",
  "lighthouse-scanner-ui",
  "dependency-checker",
  "lighthouse-scan-monitor",
  "pii-checker",
  "design-openhouse-links",
  "holidays-canada",
  "github-actions",
  "logDriver",
  "next-holidays",
  "racc-data-exploration",
  "lighthouse-cloud",
  "design-research-handbook",
  "js-documentation-example",
  "research-recherche",
  "etait-ici",
  "kubernetes-branch-review",
  "az-next",
  "heroku-digital-canada-ca-buildpack",
  ".github",
  "pre-flight",
  "accessibility-handbook",
  "seekret",
  "dashboard-backend",
  "dashboard-ui",
  "vac-benefits-directory",
  "repertoire",
  "find-benefits-and-services",
  "az-struts",
  "plan-b",
  "find-benefits-and-services-documentation",
  "cra-alpha",
  "training-repo",
  "talent",
  "security-goals-checks",
  "security-goals-demo",
  "reporting-platform",
  "product-evaluation-summaries",
  "tech-choices",
  "github-repository-quality-index",
  "security-goals-template"
];

const getRandomInt = (min = 100, max = 500) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getDate = (addDays = 1) => {
  let d = new Date();
  let date = d.setDate(d.getDate() + addDays);
  return (d1 = new Date(date));
};

const setData = (repoName, numDays = 10) => {
  let data = [];

  for (i = 0; i <= numDays; i++) {
    let obj = {
      system: "tss",
      repoName: repoName,
      score: JSON.stringify({
        value: getRandomInt(),
        clarity: getRandomInt(0, 100) / 100,
        ambiguity: getRandomInt(0, 100) / 100
      }),
      createdAt: getDate(i),
      updatedAt: new Date()
    };

    data.push(obj);
  }

  return data;
};

const one = setData(repos[0], 200);
const two = setData(repos[1], 100);

let data = [...one, ...two];

fs.writeFile("./data.json", JSON.stringify(data), function(err) {
  if (err) {
    return console.log(err);
  }

  console.log("The file was saved!");
});
