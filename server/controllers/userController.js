import auctionPool from "../db/connectDB.js";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import { generateToken } from "../helpers/token.js";

export const registerUser = async (req, res) => {
  const {
    user_name,
    user_email,
    user_password,
    user_first_name,
    user_last_name,
    user_contact_no,
    user_address_line,
    user_city,
    user_country,
    user_photo,
  } = req.body;
  let propKeys = Object.keys(req.body);
  let propValues = Object.values(req.body);
  for (let prop of ["user_name", "user_email", "user_password"]) {
    if (propKeys.indexOf(prop) === -1 || !propValues[propKeys.indexOf(prop)]) {
      return res
        .json({ message: "insufficient data", missing: prop })
        .status(401);
    }
  }

  /* check if user with user_name or user_email exists or not */
  let isUserExists = await auctionPool.query(
    "SELECT USER_NAME,USER_EMAIL FROM USERS WHERE USER_NAME = $1 OR USER_EMAIL = $2",
    [user_name.trim(), user_email.toLowerCase().trim()]
  );
  if (isUserExists.rows.length > 0)
    return res.json({ message: "user exists" }).status(201);

  /* TODO: user_name,user_email and user_password VALIDATION */

  let user_id = nanoid();
  let gen_salt = await bcrypt.genSalt(10);
  let encrypted_password = await bcrypt.hash(user_password, gen_salt);
  let refresh_token = generateToken(user_id);
  await auctionPool.query(
    "INSERT INTO USERS VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",
    [
      user_id,
      user_name.trim(),
      user_email.toLowerCase().trim(),
      encrypted_password,
      refresh_token,
      user_first_name.toLowerCase().trim(),
      user_last_name.toLowerCase().trim(),
      "",
      user_contact_no,
      user_address_line.toLowerCase().trim(),
      user_city.toLowerCase().trim(),
      user_country.toLowerCase().trim(),
      "",
      false,
      user_photo,
    ]
  );
  res.cookie("accessToken", refresh_token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 30 * 1000,
  });
  return res
    .json({
      message: "user registered!!!",
      user_email: user_email.toLowerCase().trim(),
      user_name: user_name.trim(),
      user_photo,
    })
    .status(201);
};
export const loginUser = async (req, res) => {
  const { user_cred, user_password } = req.body;
  try {
    if (!user_cred || !user_password)
      return res.json({ message: "insufficient data" }).status(400);
    let user = await auctionPool.query(
      "SELECT USER_NAME,USER_PASSWORD,USER_EMAIL,USER_REFRESH_TOKEN FROM USERS WHERE USER_NAME = $1 OR USER_EMAIL = $1",
      [user_cred]
    );
    if (user.rows.length === 0)
      return res.json({ message: "user does not exists" }).status(400);
    let isCredentialsCorrect = await bcrypt.compare(
      user_password,
      user.rows[0].user_password
    );
    if (!isCredentialsCorrect)
      return res.json({ message: "invalid credentials" }).status(200);
    else {
      res.cookie("accessToken", user.rows[0].user_refresh_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 30 * 1000,
      });
      return res
        .json({
          message: "login success",
          user_name: user.rows[0].user_name,
          user_email: user.rows[0].user_email,
        })
        .status(200);
    }
  } catch (error) {
    return res
      .json({
        message: "error",
        error: "internal server error",
      })
      .status(500);
  }
};

/* Google Firebase Login */
export const thirdParyLogin = async (req, res) => {
  const { user_name, user_email, user_photo } = req.body;
  if (!user_name || !user_email)
    return res.json({ message: "insufficient data" }).status(400);
  try {
    const userExists = await auctionPool.query(
      "SELECT USER_NAME FROM USERS WHERE USER_NAME = $1 OR USER_EMAIL = $2",
      [user_name, user_email]
    );
    let userDetails = {};
    if (userExists.rows.length === 0) {
      const user_id = nanoid();
      const refresh_token = generateToken(user_id);
      userDetails = await auctionPool.query(
        "INSERT INTO USERS VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",
        [
          user_id,
          user_name.trim(),
          user_email.toLowerCase().trim(),
          "",
          refresh_token,
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          true,
          user_photo,
        ]
      );
    } else {
      userDetails = await auctionPool.query(
        "SELECT USER_REFRESH_TOKEN FROM USERS WHERE USER_EMAIL=$1",
        [user_email]
      );
    }
    return res
      .cookie("accessToken", userDetails.rows[0].user_refresh_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 30 * 1000,
      })
      .json({ message: "third party user register / login" })
      .status(201);
  } catch (error) {
    return res.json({ message: "error" });
  }
};

export const logOutUser = async (_, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
    });
    return res.json({ message: "logout success !!!" });
  } catch (error) {
    return res.json({ message: "error" });
  }
};
