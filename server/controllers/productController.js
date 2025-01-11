import { nanoid } from "nanoid";
import auctionPool from "../db/connectDB.js";

export const addProduct = async (req, res) => {
  const user = req.user;
  const {
    set_price,
    original_price,
    title,
    desc,
    category,
    usage_time,
    bid_start_time,
    product_appeal,
    product_images,
  } = req.body;
  try {
    if (
      !set_price ||
      !original_price ||
      !title ||
      !category ||
      !usage_time ||
      !bid_start_time
    )
      return res.json({ message: "insufficient data" }).status(400);
    const product_id = nanoid();
    await auctionPool.query(
      "INSERT INTO PRODUCT VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        product_id,
        user,
        set_price,
        original_price,
        title.trim(),
        desc.trim(),
        category.trim(),
        usage_time,
        bid_start_time,
        0,
        product_appeal.trim(),
        product_images,
      ]
    );
    return res
      .json({
        message: "product added",
        product_id,
        set_price,
        original_price,
        title: title.trim(),
        desc: desc.trim(),
        category: category.trim(),
        usage_time,
        bid_start_time,
        product_appeal: product_appeal.trim(),
        product_images,
      })
      .status(201);
  } catch (error) {
    return res.json({ message: "error" }).status(400);
  }
};

export const getProductDetails = async (req, res) => {
  const product_id = req.query.product_id;
  try {
    const productDetails = await auctionPool.query(
      "SELECT * FROM PRODUCT WHERE PRODUCT_ID = $1",
      [product_id]
    );
    if (!productDetails.rowCount)
      return res.json({ message: "no product with this id." }).status(404);
    return res
      .json({ message: "success", ...productDetails.rows[0] })
      .status(201);
  } catch (error) {
    return res.json({ message: "error" }).status(400);
  }
};

export const editProduct = async (req, res) => {
  const { new_value, attr, product_id } = req.body;
  if (!new_value || !attr || !product_id)
    return res.json({ message: "insufficient data to edit" }).status(400);
  try {
    let updatedProd = await auctionPool.query(
      `UPDATE PRODUCT SET ${attr} = $1 WHERE PRODUCT_ID = $2`,
      [new_value.trim(), product_id]
    );
    if (!updatedProd.rowCount)
      return res.json({ message: "no product with this id." }).status(404);
    return res.json({ message: "update success" }).status(200);
  } catch (error) {
    return res.json({ message: "error" }).status(400);
  }
};

export const deleteProduct = async (req, res) => {
  const product_id = req.query.product_id;
  try {
    let deletedProd = await auctionPool.query(
      "DELETE FROM PRODUCT WHERE PRODUCT_ID = $1",
      [product_id]
    );
    if (!deletedProd.rowCount)
      return res.json({ message: "no product with this id" }).status(404);
    return res.json({ message: "product deleted !!!" }).status(200);
  } catch (error) {
    return res.json({ message: "error" }).status;
  }
};
