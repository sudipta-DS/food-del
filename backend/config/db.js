import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://samantasudipta301:belghariaschool@food-del.zphug.mongodb.net/?retryWrites=true&w=majority&appName=food-del"
    )
    .then(() => {
      console.log("database connected successfully.");
    })
    .catch((error) => {
      console.log("something error happened." + error.message);
    });
};

export default connectDB;
