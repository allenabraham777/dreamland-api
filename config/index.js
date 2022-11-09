import { config as envConfig } from "dotenv";
envConfig();

import db from "./db";

const env = process.env.NODE_ENV || "development";

const config = {
  port: process.env.PORT || 3001,
  application: {
    env,
  },
  db: db[env],
};

export default config;
