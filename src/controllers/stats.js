import asyncHandler from "express-async-handler";
import { AccountBalanceService, TokenBalanceService } from "services";

const accountBalanceService = new AccountBalanceService();
const tokenBalanceService = new TokenBalanceService();

const getAccountbalance = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const {
    data: { dataValues: accountBalance },
  } = await accountBalanceService.getAccountBalance(userId);
  const {
    data: { dataValues: tokenBalance },
  } = await tokenBalanceService.getTotalTokenBalanceOfUser(userId);
  const data = {
    id: accountBalance.id,
    accountBalance: accountBalance.amountBalance,
    tokenBalance: tokenBalance.tokenBalance,
  };
  res.status(201).json({ message: "Account balance till day", data });
});

export default {
  getAccountbalance,
};
