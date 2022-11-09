import { DataTypes, Model } from "sequelize";
import { sequelize } from "connection";

class TokenAccountLedger extends Model {}

TokenAccountLedger.init(
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
        model: "token_entries",
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
    modelName: "token_account_ledgers",
  }
);

export default TokenAccountLedger;
