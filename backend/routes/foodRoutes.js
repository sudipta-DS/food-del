import express from "express";
import {
  addFood,
  editFood,
  foodById,
  listFood,
  removeFood,
} from "../controllers/foodControllers.js";
import multer from "multer";

const foodRouter = express.Router();

// storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callback) => {
    return callback(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.put("/edit/:id", upload.single("image"), editFood);
foodRouter.get("/singleFood/:id", foodById);

export default foodRouter;
