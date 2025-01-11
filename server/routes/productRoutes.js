import express from "express";
import { authMiddleWare } from "../middlewares/authMiddleware.js";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProductDetails,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.route("/add").post(authMiddleWare, addProduct);
productRouter.route("/prod_details").get(getProductDetails);
productRouter.route("/edit_prod").put(authMiddleWare, editProduct);
productRouter.route("/delete_prod").delete(authMiddleWare, deleteProduct);

export default productRouter;
