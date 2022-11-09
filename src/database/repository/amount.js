import { Op } from "sequelize";
import { throwError } from "utils";
import { AmountEntry } from "models";

class AmountRepository {
  constructor() {
    this.model = AmountEntry;
  }

  addAmountToUser(debit, credit, amount, description, transaction) {
    if (!transaction) {
      throwError(null, "Transaction is required");
    }
    const newAmount = this.model.build({
      amount,
      credit,
      debit,
      description,
    });
    return newAmount.save({ transaction });
  }

  // getAmountFromUser(credit, to) {
  //   return this.model.findAll({
  //     where: {
  //       credit,
  //       createdAt: {
  //         [Op.lt]: to,
  //       },
  //     },
  //     attributes: ["amount", ["createdAt", "time"]],
  //   });
  // }
}

export default AmountRepository;
