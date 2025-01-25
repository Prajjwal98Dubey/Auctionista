import { nanoid } from "nanoid";
import auctionPool from "../db/connectDB.js";
import { categoryToDBCategory } from "../helpers/mapping.js";

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

// export const getProductDetails = async (req, res) => {
//   const product_id = req.query.product_id;
//   try {
//     const productDetails = await auctionPool.query(
//       "SELECT * FROM PRODUCT WHERE PRODUCT_ID = $1",
//       [product_id]
//     );
//     if (!productDetails.rowCount)
//       return res.json({ message: "no product with this id." }).status(404);
//     return res
//       .json({ message: "success", ...productDetails.rows[0] })
//       .status(201);
//   } catch (error) {
//     return res.json({ message: "error" }).status(400);
//   }
// };

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

export const addMobile = async (req, res) => {
  const {
    brand_name,
    model_name,
    ram_storage,
    rom_storage,
    operating_system,
    rear_camera,
    front_camera,
    product_color,
    screen_size,
    set_price,
    original_price,
    title,
    desc,
    usage_time,
    bid_start_time,
    product_appeal,
    product_images,
    bid_time,
    cpu,
  } = req.body;

  const user = req.user;

  try {
    const productId = nanoid();
    if (
      !brand_name ||
      !model_name ||
      !ram_storage ||
      !rom_storage ||
      !operating_system ||
      !rear_camera ||
      !front_camera ||
      !product_color ||
      !screen_size ||
      !set_price ||
      !original_price ||
      !title ||
      !usage_time ||
      !bid_start_time ||
      !bid_time ||
      !cpu ||
      product_images.length === 0
    ) {
      return res.json({ message: "insufficient data" }).status(400);
    }
    await auctionPool.query(
      "INSERT INTO PRODUCT VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        productId,
        user,
        set_price,
        original_price,
        title,
        desc,
        "mobile",
        usage_time,
        bid_start_time,
        0,
        product_appeal,
        product_images,
      ]
    );
    await auctionPool.query(
      "INSERT INTO MOBILE_SPEC VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)",
      [
        productId,
        brand_name,
        model_name,
        ram_storage,
        rom_storage,
        operating_system,
        rear_camera,
        front_camera,
        product_color,
        screen_size,
        product_images,
        set_price,
        original_price,
        title,
        desc,
        usage_time,
        bid_start_time,
        product_appeal,
        0,
        bid_time,
        user,
        cpu,
      ]
    );
    return res.json({ message: "product added!!!" }).status(201);
  } catch (error) {
    console.log(error);
  }
};

export const addLaptop = async (req, res) => {
  const {
    brand_name,
    model_name,
    ram_storage,
    rom_storage,
    operating_system,
    product_color,
    screen_size,
    set_price,
    original_price,
    title,
    desc,
    usage_time,
    bid_start_time,
    product_appeal,
    product_images,
    bid_time,
    cpu,
  } = req.body;

  const user = req.user;

  try {
    const productId = nanoid();
    if (
      !brand_name ||
      !model_name ||
      !ram_storage ||
      !rom_storage ||
      !operating_system ||
      !product_color ||
      !screen_size ||
      !set_price ||
      !original_price ||
      !title ||
      !usage_time ||
      !bid_start_time ||
      !bid_time ||
      !cpu ||
      product_images.length === 0
    ) {
      return res.json({ message: "insufficient data" }).status(400);
    }
    await auctionPool.query(
      "INSERT INTO PRODUCT VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        productId,
        user,
        set_price,
        original_price,
        title,
        desc,
        "laptop",
        usage_time,
        bid_start_time,
        0,
        product_appeal,
        product_images,
      ]
    );
    await auctionPool.query(
      "INSERT INTO LAPTOP_SPEC VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)",
      [
        productId,
        brand_name,
        model_name,
        ram_storage,
        rom_storage,
        operating_system,
        product_color,
        screen_size,
        product_images,
        set_price,
        original_price,
        title,
        desc,
        usage_time,
        bid_start_time,
        product_appeal,
        0,
        bid_time,
        user,
        cpu,
      ]
    );
    return res.json({ message: "product added!!!" }).status(201);
  } catch (error) {
    console.log(error);
  }
};

export const addWatch = async (req, res) => {
  const {
    brand_name,
    model_name,
    product_color,
    set_price,
    original_price,
    title,
    desc,
    usage_time,
    bid_start_time,
    product_appeal,
    bid_time,
    diameter,
    is_digital,
    is_calling_available,
    have_fitness_tracker,
    product_images,
  } = req.body;
  const user = req.user;
  try {
    const productId = nanoid();
    if (
      !brand_name ||
      !model_name ||
      !product_color ||
      !set_price ||
      !original_price ||
      !title ||
      !usage_time ||
      !bid_start_time ||
      !bid_time ||
      !is_digital ||
      !diameter
    ) {
      return res.json({ message: "insufficient data" }).status(400);
    }
    await auctionPool.query(
      "INSERT INTO PRODUCT VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        productId,
        user,
        set_price,
        original_price,
        title,
        desc,
        "watch",
        usage_time,
        bid_start_time,
        0,
        product_appeal,
        product_images,
      ]
    );
    await auctionPool.query(
      "INSERT INTO WATCH_SPEC VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)",
      [
        productId,
        brand_name,
        model_name,
        product_color,
        parseInt(diameter),
        parseInt(is_digital),
        is_calling_available,
        have_fitness_tracker,
        user,
        product_images,
        set_price,
        original_price,
        title,
        desc,
        usage_time,
        bid_start_time,
        product_appeal,
        0,
        bid_time,
      ]
    );
    return res.json({ message: "product added!!!" }).status(201);
  } catch (error) {
    return res.json({ message: "error" }).status(400);
  }
};

export const addMonitor = async (req, res) => {
  const {
    brand_name,
    model_name,
    product_color,
    screen_size,
    set_price,
    original_price,
    title,
    desc,
    usage_time,
    bid_start_time,
    product_appeal,
    bid_time,
    product_images,
  } = req.body;
  const user = req.user;
  try {
    if (
      !brand_name ||
      !model_name ||
      !product_color ||
      !screen_size ||
      !set_price ||
      !original_price ||
      !title ||
      !desc ||
      !usage_time ||
      !bid_start_time ||
      !bid_time ||
      product_images.length === 0
    ) {
      return res.json({ message: "insufficient data" }).status(400);
    }
    const productId = nanoid();
    await auctionPool.query(
      "INSERT INTO PRODUCT VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        productId,
        user,
        set_price,
        original_price,
        title,
        desc,
        "monitor",
        usage_time,
        bid_start_time,
        0,
        product_appeal,
        product_images,
      ]
    );
    await auctionPool.query(
      "INSERT INTO MONITOR_SPEC VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)",
      [
        productId,
        brand_name,
        model_name,
        product_color,
        screen_size,
        set_price,
        original_price,
        title,
        desc,
        usage_time,
        bid_start_time,
        product_appeal,
        0,
        bid_time,
        user,
        product_images,
      ]
    );
    return res.json({ message: "product added!!" }).status(201);
  } catch (error) {
    return res.json({ message: "error" }).status(400);
  }
};

export const addKeyBoard = async (req, res) => {
  const {
    brand_name,
    model_name,
    product_color,
    set_price,
    original_price,
    title,
    desc,
    usage_time,
    bid_start_time,
    product_appeal,
    bid_time,
    product_images,
  } = req.body;
  const user = req.user;
  try {
    console.log(desc, usage_time, bid_start_time, product_appeal, bid_time);
    if (
      !brand_name ||
      !model_name ||
      !product_color ||
      !set_price ||
      !original_price ||
      !title ||
      !desc ||
      !usage_time ||
      !bid_start_time ||
      !bid_time ||
      product_images.length === 0
    ) {
      return res.json({ message: "insufficient data" }).status(400);
    }
    const productId = nanoid();
    await auctionPool.query(
      "INSERT INTO PRODUCT VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        productId,
        user,
        set_price,
        original_price,
        title,
        desc,
        "keyboard",
        usage_time,
        bid_start_time,
        0,
        product_appeal,
        product_images,
      ]
    );
    await auctionPool.query(
      "INSERT INTO KEYBOARD_SPEC VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",
      [
        productId,
        brand_name,
        model_name,
        product_color,
        set_price,
        original_price,
        title,
        desc,
        usage_time,
        bid_start_time,
        product_appeal,
        0,
        bid_time,
        user,
        product_images,
      ]
    );
    return res.json({ mesage: "product added!!!" }).status(201);
  } catch (error) {
    console.log(error);
    return res.json({ message: "error" }).status(400);
  }
};

export const addHeadPhone = async (req, res) => {
  const {
    brand_name,
    model_name,
    product_color,
    is_wireless,
    set_price,
    original_price,
    title,
    desc,
    usage_time,
    bid_start_time,
    product_appeal,
    bid_time,
    product_images,
  } = req.body;
  const user = req.user;
  try {
    if (
      !brand_name ||
      !model_name ||
      !product_color ||
      !is_wireless ||
      !set_price ||
      !original_price ||
      !title ||
      !desc ||
      !usage_time ||
      !bid_start_time ||
      !bid_time ||
      product_images.length === 0
    ) {
      return res.json({ message: "insufficient data" }).status(400);
    }
    const productId = nanoid();
    await auctionPool.query(
      "INSERT INTO PRODUCT VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        productId,
        user,
        set_price,
        original_price,
        title,
        desc,
        "headphone",
        usage_time,
        bid_start_time,
        0,
        product_appeal,
        product_images,
      ]
    );
    await auctionPool.query(
      "INSERT INTO HEADPHONE_SPEC VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)",
      [
        productId,
        brand_name,
        model_name,
        product_color,
        parseInt(is_wireless),
        set_price,
        original_price,
        title,
        desc,
        usage_time,
        bid_start_time,
        product_appeal,
        0,
        bid_time,
        user,
        product_images,
      ]
    );
    return res.json({ mesage: "product added!!!" }).status(201);
  } catch (error) {
    return res.json({ message: "error" }).status(400);
  }
};

export const addMouse = async (req, res) => {
  const {
    brand_name,
    model_name,
    product_color,
    is_wireless,
    set_price,
    original_price,
    title,
    desc,
    usage_time,
    bid_start_time,
    product_appeal,
    bid_time,
    product_images,
  } = req.body;
  const user = req.user;
  try {
    if (
      !brand_name ||
      !model_name ||
      !product_color ||
      !is_wireless ||
      !set_price ||
      !original_price ||
      !title ||
      !desc ||
      !usage_time ||
      !bid_start_time ||
      !bid_time ||
      product_images.length === 0
    ) {
      return res.json({ message: "insufficient data" }).status(400);
    }
    const productId = nanoid();
    await auctionPool.query(
      "INSERT INTO PRODUCT VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        productId,
        user,
        set_price,
        original_price,
        title,
        desc,
        "mouse",
        usage_time,
        bid_start_time,
        0,
        product_appeal,
        product_images,
      ]
    );
    await auctionPool.query(
      "INSERT INTO MOUSE_SPEC VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)",
      [
        productId,
        brand_name,
        model_name,
        product_color,
        parseInt(is_wireless),
        set_price,
        original_price,
        title,
        desc,
        usage_time,
        bid_start_time,
        product_appeal,
        0,
        bid_time,
        user,
        product_images,
      ]
    );
    return res.json({ mesage: "product added!!!" }).status(201);
  } catch (error) {
    return res.json({ message: "error" }).status(400);
  }
};

export const addGeneralElectronics = async (req, res) => {
  const {
    brand_name,
    model_name,
    product_color,
    set_price,
    original_price,
    title,
    desc,
    usage_time,
    bid_start_time,
    product_appeal,
    bid_time,
    product_images,
  } = req.body;
  const user = req.user;
  try {
    if (
      !brand_name ||
      !model_name ||
      !product_color ||
      !set_price ||
      !original_price ||
      !title ||
      !desc ||
      !product_appeal ||
      !usage_time ||
      !bid_start_time ||
      !bid_time ||
      product_images.length === 0
    ) {
      return res.json({ message: "insufficient data" }).status(400);
    }
    const productId = nanoid();
    await auctionPool.query(
      "INSERT INTO PRODUCT VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
      [
        productId,
        user,
        set_price,
        original_price,
        title,
        desc,
        "general-electronics",
        usage_time,
        bid_start_time,
        0,
        product_appeal,
        product_images,
      ]
    );
    await auctionPool.query(
      "INSERT INTO GENERAL_ELECTRONICS_SPEC VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",
      [
        productId,
        brand_name,
        model_name,
        product_color,
        set_price,
        original_price,
        title,
        desc,
        usage_time,
        bid_start_time,
        product_appeal,
        0,
        bid_time,
        user,
        product_images,
      ]
    );
    return res.json({ mesage: "product added!!!" }).status(201);
  } catch (error) {
    return res.json({ message: "error" }).status(400);
  }
};

export const displayProducts = async (req, res) => {
  try {
    let latestProducts = await auctionPool.query(
      "SELECT PRODUCT_ID, PRODUCT_SET_PRICE, PRODUCT_ORIGINAL_PRICE,PRODUCT_TITLE,PRODUCT_DESC,PRODUCT_CATEGORY,PRODUCT_USAGE_TIME,BID_START_TIME,HIGHEST_BID,PRODUCT_APPEAL,PRODUCT_IMAGES FROM PRODUCT"
    );
    return res.json({ products: latestProducts.rows }).status(200);
  } catch (error) {
    console.log(error);
  }
};

export const getProductDetails = async (req, res) => {
  const { prodId, category } = req.query;
  try {
    if (categoryToDBCategory[category] === undefined)
      return res.json({ message: "category does not exists." }).status(400);
    let results = await auctionPool.query(
      `SELECT * FROM ${categoryToDBCategory[category]} WHERE PRODUCT_ID = $1`,
      [prodId]
    );
    if (results.rows.length === 0) return res.json;
    let commonAttr = {
      product_id: results.rows[0].product_id,
      brand_name: results.rows[0].brand_name,
      model_name: results.rows[0].model_name,
      product_color: results.rows[0].product_color,
      product_images: results.rows[0].product_images,
      product_set_price: results.rows[0].product_set_price,
      bid_start_time: results.rows[0].bid_start_time,
      original_price: results.rows[0].original_price,
      title: results.rows[0].title,
      desc: results.rows[0].description,
      product_appeal: results.rows[0].product_appeal,
      usage_time: results.rows[0].usage_time,
      bid_time: results.rows[0].bid_time,
      user_id: results.rows[0].user_id,
      highest_bid: results.rows[0].highest_bid,
    };
    switch (category) {
      case "mobile":
        return res
          .json({
            details: {
              ...commonAttr,
              ram_storage: results.rows[0].ram_storage,
              rom_storage: results.rows[0].rom_storage,
              operating_system: results.rows[0].operating_system,
              rear_camera: results.rows[0].rear_camera,
              front_camera: results.rows[0].front_camera,
              screen_size: results.rows[0].screen_size,
              cpu: results.rows[0].cpu,
            },
          })
          .status(200);
      case "laptop":
        return res
          .json({
            details: {
              ...commonAttr,
              ram_storage: results.rows[0].ram_storage,
              rom_storage: results.rows[0].rom_storage,
              operating_system: results.rows[0].operating_system,
              rear_camera: results.rows[0].rear_camera,
              front_camera: results.rows[0].front_camera,
              screen_size: results.rows[0].screen_size,
              cpu: results.rows[0].cpu,
            },
          })
          .status(200);
      case "monitor":
        return res
          .json({
            details: {
              ...commonAttr,
              screen_size: results.rows[0].screen_size,
            },
          })
          .status(200);
      case "keyboard":
        return res
          .json({
            details: {
              ...commonAttr,
            },
          })
          .status(200);
      case "watch":
        return res
          .json({
            details: {
              ...commonAttr,
              diameter: results.rows[0].diameter,
              is_digital: results.rows[0].is_digital,
              is_calling_available: results.rows[0].is_calling_available,
              have_fitness_tracker: results.rows[0].have_fitness_tracker,
            },
          })
          .status(200);
      case "mouse":
        return res
          .json({
            details: {
              ...commonAttr,
              is_wireless: results.rows[0].is_wireless,
            },
          })
          .status(200);
      case "headphone":
        return res
          .json({
            details: {
              ...commonAttr,
              is_wireless: results.rows[0].is_wireless,
            },
          })
          .status(200);
      case "general-electronics":
        return res
          .json({
            details: {
              ...commonAttr,
              is_wireless: results.rows[0].is_wireless,
            },
          })
          .status(200);
      default:
        return res.json({ message: "something went wrong." }).status(400);
    }
  } catch (error) {
    console.log(error);
  }
};
