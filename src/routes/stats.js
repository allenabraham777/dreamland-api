import { statsController } from "controllers";

const statRoutes = (app) => {
  /**
   * @swagger
   * /api/stats/{userId}:
   *   get:
   *     summary: Returns the history of DREAM tokens a user has won for the current day so far.
   *     description: RAPI that returns the history of DREAM tokens a user has won for the current day so far.
   *     tags:
   *       - Token
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
   *         description: Total token for the day for that user.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: integer
   *                   description: Total token.
   *                   example: 0
   */
  app.get("/api/stats/:userId", statsController.getAccountbalance);
};

export default statRoutes;
