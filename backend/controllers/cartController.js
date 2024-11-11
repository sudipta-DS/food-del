import userModel from "../models/userModel.js";

const addCart = async (req, res) => {
  let userData = await userModel.findById(req.body.userId);
  let cartData = userData.cartItems;
  if (!cartData[req.body.itemId]) {
    cartData[req.body.itemId] = 1;
  } else {
    cartData[req.body.itemId] += 1;
  }
  await userModel.findByIdAndUpdate(req.body.userId, { cartItems: cartData });
  res.status(201).json({ success: true, message: "item added in cart" });
};

const removeCart = async (req, res) => {
  const userData = await userModel.findById(req.body.userId);
  let cartData = userData.cartItems;
  if (cartData[req.body.itemId] > 0) {
    cartData[req.body.itemId] -= 1;
  }
  await userModel.findByIdAndUpdate(req.body.userId, { cartItems: cartData });
  res.json({ success: true, message: "item removed from cart." });
};

const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartItems;
    res.json({ success: true, data: cartData });
  } catch (error) {
    res.json({ success: false, message: "error" });
  }
};

export { addCart, removeCart, getCart };
