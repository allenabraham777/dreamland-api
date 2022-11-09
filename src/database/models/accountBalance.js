import { DataTypes, Model } from "sequelize";
import { sequelize } from "connection";

class AmountBalance extends Model {}

AmountBalance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "accounts",
        key: "id",
      },
    },
    amountBalance: {
      type: DataTypes.NUMBER,
      field: "account_balance",
    },
  },
  {
    sequelize,
    modelName: "account_balances",
  }
);

export default AmountBalance;
