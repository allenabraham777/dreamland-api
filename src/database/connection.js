import { Sequelize } from "sequelize";
import config from "config";

const dbConfig = config.db;
const { username, password, database, host, port, dialect } = dbConfig;

export const sequelize = new Sequelize({
  username,
  password,
  database,
  host,
  port,
  dialect,
});

const connectDB = async () => {
  try {
    await sequelize.sync();
    await sequelize.authenticate();
    console.log("Db Connected".cyan.bold);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default connectDB;
