import mongoose from "mongoose";
import connectToDatabase from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});
connectToDatabase();

/*
using iffy to use 
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${constants.DB_NAME}`);

    app.on("error", (error) => {
      console.log("Error in MongoDB connection", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
})(); */
