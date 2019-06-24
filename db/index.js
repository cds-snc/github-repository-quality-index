// this file is for testing only
const Repo = require("./models/repo");
const Sequelize = require("sequelize");
const { configure } = require("sequelize-pg-utilities");
const config = require("./config/config.js");
const { name, user, password, options } = configure(config);
const sequelize = new Sequelize(name, user, password, options);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    /*
    const repos = await Repo(sequelize, Sequelize);
    const data = await repos.findOne();
    repos.create({
      repoName: "works",
      statistics: { pull_requests: 8, approved: true }
    });
    console.log("All users:", JSON.stringify(data, null, 4));
    */
  } catch (e) {
    console.log(e.message);
  }
})();
