import mongoose from "mongoose";
import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image_name = req.file.filename;
    console.log(image_name);
    const newFood = await foodModel.create({
      name: name,
      description: description,
      price: price,
      image: image_name,
      category: category,
    });
    res
      .status(201)
      .json({ success: true, message: "food added successfully." });
  } catch (error) {
    // console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listFood = async (req, res) => {
  try {
    const { location } = req.body;
    const foods = await foodModel.find({ location: location });
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    res.status(500).json({ success: false, message: "error" });
  }
};

const removeFood = async (req, res) => {
  try {
    console.log(req.body.id);
    const food = await foodModel.findByIdAndDelete(req.body.id);
    // console.log(food);
    fs.unlink(`uploads/${food.image}`, () => {});
    res.status(200).json({ success: true, message: "food removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const editFood = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, price, category } = req.body;
    const image_name = req.file.filename;
    console.log(req.body);
    const updatedFood = await foodModel.findByIdAndUpdate(id, {
      name,
      description,
      price,
      image: image_name,
      category,
    });
    res.status(201).json({
      success: true,
      message: "food edited",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "something went wrong." });
  }
};

const foodById = async (req, res) => {
  try {
    const id = req.params.id;
    const existingFood = await foodModel.findById(id);

    res.status(200).json({ success: true, data: existingFood });
  } catch (error) {
    res.status(500).json({ success: false, message: "something went wrong." });
  }
};

export { addFood, listFood, removeFood, editFood, foodById };
