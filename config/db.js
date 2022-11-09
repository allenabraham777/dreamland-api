require("dotenv").config();

module.exports = {
  development: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    host: process.env.PROD_DB_HOST,
    database: process.env.PROD_DB_NAME,
    username: process.env.PROD_DB_USER,
    port: process.env.PROD_DB_PORT,
    password: process.env.PROD_DB_PASSWORD,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
