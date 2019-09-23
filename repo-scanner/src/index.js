require = require("esm")(module); 
require('dotenv').config();
const express = require('express');
const fetch = require("node-fetch");
const Repo = require("./models/repo");
const Sequelize = require("sequelize");
const { configure } = require("sequelize-pg-utilities");
const config = require("./config/config.js");
const { name, user, password, options } = configure(config);
const sequelize = new Sequelize(name, user, password, options);
const getToken = require("./authenticate");

const port = parseInt(process.env.PORT, 10) || 3000;
const server = express();

const scan = async () => {
  const token = await getToken();
  const page_length = 100;
  let more_data = true;
  let repos = [];
  let page = 1;
  // upper limit of 100 repos in github's api
  while (more_data) {
    const response = await fetch(`https://api.github.com/orgs/${process.env.ORGANIZATION}/repos?per_page=${page_length}&page=${page}`, {
      headers: {
        authorization: `token ${token}`,
        accept: "application/vnd.github.machine-man-preview+json"
      }
    });
    //console.log(response);
    page ++;
    if (response.ok) {
      const data = await response.json();
      console.log("Page " + page + " of results: " + data.length + " responses");
      repos = repos.concat(data);
      if (data.length < page_length)
        more_data = false;
    } else {
      console.log(response)
      throw new Error("response not ok");
    }
  }
  
  // send off requests to Agent
  const agentURL = process.env.AGENT_URL;

  const results = await Promise.all(
    repos.map(repo => {
      return fetch(agentURL + repo.name)
        .then(function (response) {
          console.log("Response received for: " + repo.name);
          return response.json();
        })
        .then(function(data) {
          return {"repoName": repo.name, "statistics": data, "createdAt": new Date(), "updatedAt": new Date()};
        })
        .catch((err) => {
          console.error('Error: ' + JSON.stringify(err));
        });
    })
  );
  
  // write results to DB
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    const reposQuery = await Repo(sequelize, Sequelize);
    reposQuery.bulkCreate(results);
  } catch (e) {
    console.log(e.message);
    process.exit();
  }
};

server.get('/scan', async function(req, res) {
  await scan();
  res.status(200).send('OK');
});

server.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});