import jwt from "jsonwebtoken";
export const authMiddleWare = async (req, res, next) => {
  if (req.headers && req.headers.cookie && req.headers.cookie.split("=")[1]) {
    try {
      let accessToken = jwt.verify(
        req.headers.cookie.split("=")[1],
        process.env.JWT_SECRET_KEY
      );
      req.user = accessToken.user_id;
      next();
    } catch (error) {
      return res.json({ message: "error" });
    }
  } else {
    return res.json({ message: "invalid request" }).status(400);
  }
};
