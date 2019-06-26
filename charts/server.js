const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;

//db
const Sequelize = require("sequelize");
const { configure } = require("sequelize-pg-utilities");
const Score = require("../db/models/score");
const config = require("../db/config/config.js");
const { name, user, password, options } = configure(config);
const sequelize = new Sequelize(name, user, password, options);

app.use(cors());
app.use("/", express.static(path.join(__dirname, "dist")));

app.use(function(req, res, next) {
  if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
    return res.sendStatus(204);
  }

  return next();
});

app.post(`/scores/:reponame`, async (req, res) => {
  const repoName = req.params.reponame ? req.params.reponame : "";

  let data = [];

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const scores = await Score(sequelize, Sequelize);

    // query for the data
    const dataset = await scores.findAll({
      where: { repoName: repoName, system: "tss" },
      limit: 50,
      attributes: ["createdAt", "score"]
    });

    dataset.forEach(item => {
      const { value, clarity, ambiguity } = item.score;

      data.push({
        name: item.name,
        value: value,
        clarity: clarity,
        ambiguity: ambiguity
      });
    });
  } catch (e) {
    console.log(e.message);
  }

  res.status(200).send({ data });
});

app.listen(port, err => {
  if (err) {
    throw err;
  }
  console.log(`> Ready on http://localhost:${port}`);
});
