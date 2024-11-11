import express from "express";
import { loginUser, signupUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", signupUser);

export default userRouter;
