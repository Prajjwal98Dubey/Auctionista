import express from "express";
import { authMiddleWare } from "../middlewares/authMiddleware.js";
import {
  addGeneralElectronics,
  addHeadPhone,
  addKeyBoard,
  addLaptop,
  addMobile,
  addMonitor,
  addMouse,
  addProduct,
  addWatch,
  deleteProduct,
  editProduct,
  getProductDetails,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.route("/add").post(authMiddleWare, addProduct);
productRouter.route("/prod_details").get(getProductDetails);
productRouter.route("/edit_prod").put(authMiddleWare, editProduct);
productRouter.route("/delete_prod").delete(authMiddleWare, deleteProduct);
productRouter.route("/add_mobile").post(authMiddleWare, addMobile);
productRouter.route("/add_laptop").post(authMiddleWare, addLaptop);
productRouter.route("/add_watch").post(authMiddleWare, addWatch);
productRouter.route("/add_monitor").post(authMiddleWare, addMonitor);
productRouter.route("/add_keyboard").post(authMiddleWare, addKeyBoard);
productRouter.route("/add_mouse").post(authMiddleWare, addMouse);
productRouter
  .route("/add_general_electronics")
  .post(authMiddleWare, addGeneralElectronics);
productRouter.route("/add_headphone").post(authMiddleWare, addHeadPhone);

export default productRouter;
