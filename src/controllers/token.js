import asyncHandler from "express-async-handler";
import { TokenService } from "services";

const tokenService = new TokenService();

const addTokenToUser = asyncHandler(async (req, res) => {
  const { user, token } = req.body;
  const { data } = await tokenService.addTokenToUser(user, token);
  res.status(201).json({ message: "Token Added Successfully", data });
});

const getDayToken = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { data } = await tokenService.getTokenFromUserOnCurrentDay(userId);
  res.status(201).json({ message: "Token for current day", data });
});

export default {
  addTokenToUser,
  getDayToken,
};
