import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import authMiddleware from "./middlewares/auth.js";
import orderRouter from "./routes/orderRoutes.js";
import bodyParser from "body-parser";

// app config
const app = express();
const port = 4000;

// middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/images", express.static("uploads"));
app.use("/api/cart", authMiddleware, cartRouter);
app.use("/api/order", orderRouter);
// server
app.listen(port, () => {
  console.log("server started successfully.");
});
