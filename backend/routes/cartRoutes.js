import express from "express";
import { addCart, getCart, removeCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", addCart);
cartRouter.post("/remove", removeCart);
cartRouter.get("/list", getCart);

export default cartRouter;
