import asyncHandler from "express-async-handler";
import { AccountBalanceService } from "services";

const accountBalanceService = new AccountBalanceService();

const getAccountbalance = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { data } = await accountBalanceService.getAccountBalance(userId);
  res.status(201).json({ message: "Account balance till day", data });
});

export default {
  getAccountbalance,
};
