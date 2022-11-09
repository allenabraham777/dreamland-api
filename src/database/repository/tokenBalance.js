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

  getTokenBalanceOfUser(id) {
    return this.model.findOne({
      where: {
        id,
      },
      attributes: ["id", "tokenBalance"],
    });
  }
}

export default TokenBalanceRepository;
