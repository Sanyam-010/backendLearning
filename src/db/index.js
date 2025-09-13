import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";
dotenv.config();

// database in another continent 😜😂
const connectToDatabase = async () => {
  try {
    const connectInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`\n MongoDb connected || DB${connectInstance.connection.host}`);
  } catch (error) {
    console.log("Error in DB connection", error);
    process.exit(1); //read this
  }
};

export default connectToDatabase;
