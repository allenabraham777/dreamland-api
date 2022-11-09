import { statsController } from "controllers";

const statRoutes = (app) => {
  /**
   * @swagger
   * /api/stats/{userId}:
   *   get:
   *     summary: Returns the history of DREAM tokens a user has won for the current day so far and the total USD claimed.
   *     description: API that returns the history of DREAM tokens a user has won for the current day so far and the total USD claimed.
   *     tags:
   *       - Stats
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
   *         description: User stats.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Total token.
   *                   example: Account balance till day
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                       exapmle: 101
   *                     accountBalance:
   *                       type: string
   *                       example: 0.00016
   *                     tokenBalance:
   *                       type: string
   *                       example: 0.0001
   *
   */
  app.get("/api/stats/:userId", statsController.getAccountbalance);
};

export default statRoutes;
