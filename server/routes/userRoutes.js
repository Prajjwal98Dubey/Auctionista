import express from "express";
import {
  loginUser,
  logOutUser,
  registerUser,
  thirdParyLogin,
} from "../controllers/userController.js";
import { authMiddleWare } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/third_partya_auth").post(thirdParyLogin);
userRouter.route("/logout").get(authMiddleWare, logOutUser);

export default userRouter;
