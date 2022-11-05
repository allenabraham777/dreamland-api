import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";

class TokenTransaction extends Model {}

TokenTransaction.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    debit: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    credit: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
  },
  {
    sequelize,
    modelName: "token_transaction",
  }
);

export default TokenTransaction;
