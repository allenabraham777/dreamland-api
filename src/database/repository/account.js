import { Account } from "models";

class AccountRepository {
  constructor() {
    this.model = Account;
  }

  getUserId(email) {
    return this.model.findOrCreate({
      where: {
        email,
      },
    });
  }

  getEmail(id) {
    return this.model.findOne({ where: { id } });
  }
}

export default AccountRepository;
