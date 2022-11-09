import { DataTypes, Model } from "sequelize";
import { sequelize } from "connection";

class TokenBalance extends Model {}

TokenBalance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "accounts",
        key: "id",
      },
    },
    tokenBalance: {
      type: DataTypes.NUMBER,
      field: "token_balance",
    },
  },
  {
    sequelize,
    modelName: "token_balances",
  }
);

export default TokenBalance;
