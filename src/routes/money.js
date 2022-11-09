import { amountController } from "controllers";

const moneyRoutes = (app) => {
  /**
   * @swagger
   * /api/amount/{userId}:
   *   get:
   *     summary: Returns the total amount a user has won for till yesterday so far.
   *     description: API that returns the total amount a user has won for till yesterday so far.
   *     tags:
   *       - Amount
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         description: Id of user.
   *         example: 101
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Total amount claimed till yesterday.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Success Message.
   *                   example: Account balance till day
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                       description: User id
   *                       example: 101
   *                     amountBalance:
   *                       type: string
   *                       description: Total USD claimed
   *                       example: "0.00016"
   */
  app.get("/api/amount/:userId", amountController.getAccountbalance);
};

export default moneyRoutes;
