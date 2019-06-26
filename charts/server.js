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
//app.use("/", express.static(path.join(__dirname, "dist")));

app.use(function(req, res, next) {
  if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
    return res.sendStatus(204);
  }

  return next();
});

app.post(`/scores`, async (req, res) => {
  /*
 "score": {
                "value": 153,
                "clarity": 0.15,
                "ambiguity": 0.16
            }

*/
  /*
  const data = [
    { name: "Page A", value: 4000, clarity: 2400, ambiguity: 2400 },
    { name: "Page B", value: 3000, clarity: 1398, ambiguity: 2100 },
    { name: "Page C", value: 2000, clarity: 9800, ambiguity: 1000 }
  ];
  */

  let data = [];

  try {
    await sequelize.authenticate();
    const scores = await Score(sequelize, Sequelize);
    console.log("Connection has been established successfully.");
    const dataset = await scores.findAll({
      where: { repoName: "digital-canada-ca", system: "tss" },
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
