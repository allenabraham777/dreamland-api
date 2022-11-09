import { Op } from "sequelize";
import { throwError } from "utils";
import { TokenEntry } from "models";

class TokenRepository {
  constructor() {
    this.model = TokenEntry;
  }

  addTokenToUser(debit, credit, token, description, transaction) {
    if (!transaction) {
      throwError(null, "Transaction is required");
    }
    const newToken = this.model.build({
      token,
      credit,
      debit,
      description,
    });
    return newToken.save({ transaction });
  }

  getTokenFromUser(credit, from, to) {
    return this.model.findAll({
      where: {
        credit,
        createdAt: {
          [Op.gte]: from,
          [Op.lt]: to,
        },
      },
      attributes: ["token", ["createdAt", "time"]],
    });
  }
}

export default TokenRepository;
