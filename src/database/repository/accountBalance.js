import { AccountBalance } from "models";

class AccountBalanceRepository {
  constructor() {
    this.model = AccountBalance;
  }

  getAccountBalance(id) {
    return this.model.findOne({
      where: {
        id,
      },
      attributes: ["id", "amountBalance"],
    });
  }
}

export default AccountBalanceRepository;
