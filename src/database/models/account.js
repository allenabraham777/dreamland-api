import { DataTypes, Model } from "sequelize";
import { sequelize } from "connection";

class Account extends Model {}

Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "accounts",
  }
);

export default Account;
