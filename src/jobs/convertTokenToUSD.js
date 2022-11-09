import cron from "node-cron";
import { TokenBalanceService, TokenService, AmountService } from "services";
import { sequelize } from "connection";

const convertTokenToUSD = () => {
  const tokenBalanceService = new TokenBalanceService();
  const amountService = new AmountService();
  const tokenService = new TokenService();
  cron.schedule("0 0 0 * * *", async () => {
    const transaction = await sequelize.transaction();
    try {
      const { data } = await tokenBalanceService.getTotalTokenBalance(
        transaction
      );
      const tokens = data.map(({ dataValues }) => dataValues);
      for (const token of tokens) {
        const amount = 0.16 * token.tokenBalance;
        await amountService.addAmountToUser(token.id, amount, transaction);
        await tokenService.debitTokenFromUser(
          token.id,
          token.tokenBalance,
          transaction
        );
      }
      transaction.commit();
    } catch (error) {
      transaction.rollback();
      console.error("Error converting token to USD");
    }
  });
};

export default convertTokenToUSD;
