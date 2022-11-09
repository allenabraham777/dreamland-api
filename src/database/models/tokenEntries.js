import { DataTypes, Model } from "sequelize";
import { sequelize } from "connection";

class TokenEntry extends Model {}

TokenEntry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.NUMBER,
      defaultValue: 0.0,
    },
    debit: {
      type: DataTypes.INTEGER,
      references: {
        model: "accounts",
        key: "id",
      },
    },
    credit: {
      type: DataTypes.INTEGER,
      references: {
        model: "accounts",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "token_entries",
  }
);

export default TokenEntry;
