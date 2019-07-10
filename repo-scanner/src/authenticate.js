const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");

const getFile = async (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) { reject(err); }
      resolve(data);
    });
  });
};

const getKey = async () => {
  const file = path.resolve(__dirname, `../github.pem`);
  const privateKey = await getFile(file);

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iat: now, // Issued at time
    exp: now + 60 * 10 - 30, // JWT expiration time (10 minute maximum, 30 seconds of leeway)
    iss: process.env.ISSUER_ID
  };
  const key = jwt.sign(payload, privateKey, { algorithm: 'RS256'});
  return key;
}

const getInstallationID = async (key) => {
  const response = await fetch(`https://api.github.com/orgs/${process.env.ORGANIZATION}/installation`, {
    headers: {
      authorization: `Bearer ${key}`,
      accept: "application/vnd.github.machine-man-preview+json"
    }
  });

  if (response.ok) {
    const data = await response.json();
    return data.id;
  } else {
    console.log(response);
    throw new Error("Error getting installation ID");
  };
};

const getToken = async () => {
  const key = await getKey();
  const id = await getInstallationID(key);
  const response = await fetch(`https://api.github.com/app/installations/${id}/access_tokens`, {
  method: 'POST',  
  headers: {
      authorization: `bearer ${key}`,
      accept: "application/vnd.github.machine-man-preview+json"
    }
  });
  if (response.ok) {
    const data = await response.json();
    return data.token;
  } else {
    console.log(response);
    throw new Error();
  }
};

module.exports = () => {
  return getToken();
}