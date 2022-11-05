import { sequelize } from "database/connection.js";
import { TokenRepository } from "repository";
import { formatData, throwError, dateUtils } from "utils";

class TokenService {
  constructor() {
    this.repository = new TokenRepository();
  }

  async addTokenToUser(user, token) {
    const transaction = await sequelize.transaction();
    try {
      const data = await this.repository.addTokenToUser(
        user,
        token,
        transaction
      );
      await transaction.commit();
      return formatData(data);
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }

  async getTokenFromUserOnCurrentDay(user) {
    const from = dateUtils.getToday();
    const to = dateUtils.getTomorrow();
    const data = await this.repository.getTokenFromUser(user, from, to);
    return formatData(data);
  }
}

export default TokenService;
