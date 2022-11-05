import { tokenController } from "controllers";
import { tokenValidator } from "validators";
const tokenRoutes = (app) => {
  /**
   * @swagger
   * /api/token:
   *   post:
   *     summary: Accepts that a user has won some amount of DREAM token at a particular time of a day.
   *     description: API that accepts that a user has won some amount of DREAM token at a particular time of a day (can be fractional tokens).
   *     tags:
   *       - Token
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               user:
   *                 type: string
   *                 description: The user's id.
   *                 example: 101
   *               token:
   *                 type: number
   *                 description: The amount of token.
   *                 example: 0.001
   *     responses:
   *       200:
   *         description: Success message.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Token Added Successfully
   *                 data:
   *                   type: object
   *                   properties:
   *                     user:
   *                       type: string
   *                       description: The user's id.
   *                       example: 101
   *                     token:
   *                       type: number
   *                       description: The amount of token.
   *                       example: 0.001
   */
  app.post(
    "/api/token",
    tokenValidator.addTokenvalidator,
    tokenController.addTokenToUser
  );

  /**
   * @swagger
   * /api/token/{userId}:
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
  app.get("/api/token/:userId", tokenController.getDayToken);
};

export default tokenRoutes;
