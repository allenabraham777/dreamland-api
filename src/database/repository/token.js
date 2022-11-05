import { Op } from "sequelize";
import { throwError } from "utils";
import { TokenTransaction } from "../models";

class TokenRepository {
  constructor() {
    this.model = TokenTransaction;
  }

  addTokenToUser(user, token, transaction) {
    if (!transaction) {
      throwError(null, "Transaction is required");
    }
    const newToken = this.model.build({
      user,
      credit: token,
      amount: token,
    });
    return newToken.save({ transaction });
  }

  getTokenFromUser(user, from, to) {
    return TokenTransaction.findAll({
      where: {
        user,
        credit: {
          [Op.gt]: 0,
        },
        createdAt: {
          [Op.gte]: from,
          [Op.lt]: to,
        },
      },
      attributes: [
        ["credit", "token"],
        ["createdAt", "time"],
      ],
    });
  }
}

export default TokenRepository;
