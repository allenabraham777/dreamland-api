import { AccountBalanceRepository } from "repository";
import { formatData } from "utils";

class AccountBalanceService {
  constructor() {
    this.repository = new AccountBalanceRepository();
  }

  async getAccountBalance(accountId) {
    try {
      const accountBalance = await this.repository.getAccountBalance(accountId);
      return formatData(accountBalance);
    } catch (error) {
      throw error;
    }
  }
}

export default AccountBalanceService;
