import { DataTypes, Model } from "sequelize";
import { sequelize } from "connection";

class AmountAccountLedger extends Model {}

AmountAccountLedger.init(
  {
    accountId: {
      type: DataTypes.INTEGER,
      references: {
        model: "accounts",
        key: "id",
      },
    },
    entryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "amount_entries",
        key: "id",
      },
    },
    amount: {
      type: DataTypes.NUMBER,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "amount_account_ledgers",
  }
);

export default AmountAccountLedger;
