require("dotenv").config();
const db = require("./db");

const env = process.env.NODE_ENV || "development";

const config = {
  port: process.env.PORT || 3001,
  application: {
    env,
  },
  db: db[env],
};

module.exports = config;
