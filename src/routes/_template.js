const abcRoutes = (app) => {
  /**
   * @swagger
   * /route/{id}:
   *   post:
   *     summary: Retrieve a single JSONPlaceholder user.
   *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
   *     tags:
   *       - User
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Numeric ID of the user to retrieve.
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: The user's name.
   *                 example: Leanne Graham
   *     responses:
   *       200:
   *         description: A single user.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                       description: The user ID.
   *                       example: 0
   *                     name:
   *                       type: string
   *                       description: The user's name.
   *                       example: Leanne Graham
   */
  app.post("/route/:id", (req, res) => {
    res.json({ message: "success" });
  });
};

export default abcRoutes;
