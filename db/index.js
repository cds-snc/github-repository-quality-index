const Sequelize = require("sequelize");
const { configure } = require("sequelize-pg-utilities");
const config = require("./config/config.json");
const { name, user, password, options } = configure(config);

// npx sequelize-cli db:migrate
// npx sequelize-cli db:seed:all

const sequelize = new Sequelize(name, user, password, options);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
