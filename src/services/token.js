import { sequelize } from "connection";
import { TokenRepository, AccountRepository } from "repository";
import { formatData, throwError, dateUtils } from "utils";
import accountConstants from "constants/accounts";

class TokenService {
  constructor() {
    this.repository = new TokenRepository();
    this.accountRepository = new AccountRepository();
  }

  async addTokenToUser(user, token) {
    const transaction = await sequelize.transaction();
    try {
      const houseEmail = accountConstants.house.email;
      const [{ id: debit }] = await this.accountRepository.getUserId(
        houseEmail
      );
      const [{ id: credit }] = await this.accountRepository.getUserId(user);
      const date = dateUtils.getToday(false);
      const description = `Game winner token of ${token} to ${user} on ${date}`;
      const data = await this.repository.addTokenToUser(
        debit,
        credit,
        token,
        description,
        transaction
      );
      data.credit = credit;
      data.debit = debit;
      await transaction.commit();
      return formatData(data);
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }

  async debitTokenFromUser(user, token, t = null) {
    const transaction = t ? t : await sequelize.transaction();
    try {
      const houseEmail = accountConstants.house.email;
      const [{ id: credit }] = await this.accountRepository.getUserId(
        houseEmail
      );
      const debit = user;
      const date = dateUtils.getToday(false);
      const description = `Debit token of ${token} from ${user} on ${date}`;
      const data = await this.repository.addTokenToUser(
        debit,
        credit,
        token,
        description,
        transaction
      );
      data.credit = credit;
      data.debit = debit;
      if (!t) {
        await transaction.commit();
      }
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
