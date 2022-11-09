import { TokenBalanceRepository } from "repository";
import { formatData } from "utils";
import { sequelize } from "connection";

class TokenBalanceService {
  constructor() {
    this.repository = new TokenBalanceRepository();
  }

  async getTotalTokenBalance(t = null) {
    const transaction = t ? t : await sequelize.transaction();
    try {
      const tokenBalanceList = await this.repository.getTokenBalance(
        transaction
      );
      if (!t) {
        await transaction.commit();
      }
      return formatData(tokenBalanceList);
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }

  async getTotalTokenBalanceOfUser(userId) {
    try {
      const tokenBalance = await this.repository.getTokenBalanceOfUser(userId);
      return formatData(tokenBalance);
    } catch (error) {
      throw error;
    }
  }
}

export default TokenBalanceService;
