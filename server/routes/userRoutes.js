import express from "express";
import {
  deleteUser,
  editUser,
  getLoggedInUserDetails,
  getUserDetails,
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
userRouter.route("/my_details").get(authMiddleWare, getLoggedInUserDetails);
userRouter.route("/user_details").get(getUserDetails);
userRouter.route("/edit_user").put(authMiddleWare, editUser);
userRouter.route("/delete_user").delete(authMiddleWare, deleteUser);

export default userRouter;
