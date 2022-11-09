import { sequelize } from "connection";
import { AccountRepository, AmountRepository } from "repository";
import { formatData, throwError, dateUtils } from "utils";
import accountConstants from "constants/accounts";

class AmountService {
  constructor() {
    this.repository = new AmountRepository();
    this.accountRepository = new AccountRepository();
  }

  async addAmountToUser(userId, amount, t = null) {
    const transaction = t ? t : await sequelize.transaction();
    try {
      const houseEmail = accountConstants.house.email;
      const [{ id: debit }] = await this.accountRepository.getUserId(
        houseEmail
      );
      const date = dateUtils.getToday(false);
      const description = `Credit amount of ${amount} to ${userId} on ${date}`;
      const data = await this.repository.addAmountToUser(
        debit,
        userId,
        amount,
        description,
        transaction
      );
      if (!t) {
        await transaction.commit();
      }
      return formatData(data);
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }

  // async getTokenFromUserOnCurrentDay(user) {
  //   const from = dateUtils.getToday();
  //   const to = dateUtils.getTomorrow();
  //   const data = await this.repository.getTokenFromUser(user, from, to);
  //   return formatData(data);
  // }
}

export default AmountService;
