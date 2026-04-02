import express from "express";
import {
  getActiveUsersCountExplain,
  getUsersByAge,
  registerUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.get("/age", getUsersByAge);

userRouter.get("/active-count", getActiveUsersCountExplain);

export default userRouter;
