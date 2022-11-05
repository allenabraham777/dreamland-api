import { config as envConfig } from "dotenv";
envConfig();

const config = {
  port: process.env.PORT || 3001,
  application: {
    env: process.env.NODE_ENV || "development",
  },
  db: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    dialect: "postgres",
  },
};

export default config;
