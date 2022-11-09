import { Op } from "sequelize";
import { throwError } from "utils";
import { TokenBalance } from "models";

class TokenBalanceRepository {
  constructor() {
    this.model = TokenBalance;
  }

  getTokenBalance(transaction) {
    if (!transaction) {
      throwError(null, "Transaction is required");
    }
    return this.model.findAll({
      where: {
        tokenBalance: {
          [Op.gt]: 0,
        },
      },
      attributes: ["id", "tokenBalance"],
      transaction,
    });
  }
}

export default TokenBalanceRepository;
