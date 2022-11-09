import { DataTypes, Model } from "sequelize";
import { sequelize } from "connection";

class AmountEntry extends Model {}

AmountEntry.init(
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
    amount: {
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
    modelName: "amount_entries",
  }
);

export default AmountEntry;
