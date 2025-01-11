import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

/* AUTH */
app.use("/api/v1/auth", userRouter);

/* PRODUCT */
app.use("/api/v1/product", productRouter);

app.listen(process.env.PORT || 5001, () =>
  console.log(`app listening at ${process.env.PORT || 5001}`)
);
