import orderModel from "../models/orderModel.js";
import Razorpay from "razorpay";
import userModel from "../models/userModel.js";

var razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const placeOrder = async (req, res) => {
  try {
    const url = "http://localhost:5173";
    // console.log(req.body);

    // console.log(typeof req.body.amount);

    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
      receipt: "BILL5678",
    };

    razorpayInstance.orders.create(options, async (error, order) => {
      if (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          message: "error",
          session_url: `/verify/?success=false&orderId=${newOrder._id}`,
        });
      }
      const newOrder = await orderModel.create({
        userId: req.body.userId,
        items: req.body.items,
        amount: req.body.amount,
        address: req.body.address,
      });
      res.status(200).json({
        success: true,
        message: "order successful",
        session_url: `/verify/?success=true&orderId=${newOrder._id}`,
        data: order,
      });
    });

    // success_url : `${url}/verify/?success=true&orderId=${newOrder._id}`
    // rejection_url: `${url}/verify/?success=false&orderId=${newOrder._id}`
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "error" });
  }
};

const verifyOrder = async (req, res) => {
  const { success, orderId } = req.body;
  console.log(req.body);
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(req.body.userId, { cartItems: {} });
      res.json({ success: true, message: "paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: true, message: "Not Paid" });
    }
  } catch (error) {
    res.json({ success: false, message: "error" });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({
      userId: req.body.userId,
      payment: true,
    });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.json({ success: false, message: "error" });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ payment: true });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
