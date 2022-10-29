import { config as envConfig } from "dotenv";
envConfig();

const config = {
  port: process.env.PORT || 3001,
  application: {
    env: process.env.NODE_ENV || "development",
  },
};

export default config;
