import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";

const createToken = (id) => {
  return jwt.sign({ id }, "food-del");
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      res.json({ success: false, message: "no user found." });
    } else {
      const isMatched = await bcrypt.compare(password, existingUser.password);
      if (!isMatched) {
        res.json({ success: false, message: "wrong password" });
      } else {
        const token = createToken(existingUser._id);
        res.status(200).json({
          success: true,
          message: "login successful",
          token: token,
          data: existingUser,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.json({ success: false, message: "user already exists" });
    } else if (!validator.isEmail(email)) {
      res.json({ success: false, message: "enter a valid email address." });
    } else if (password.length < 8) {
      res.json({ success: false, message: "enter a strong password." });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await userModel.create({
        name: name,
        email: email,
        password: hashedPassword,
      });
      const token = createToken();

      res.status(201).json({
        success: true,
        message: "user registered successfully.",
        token: token,
        data: newUser,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export { loginUser, signupUser };
