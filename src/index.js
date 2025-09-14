import connectToDatabase from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

connectToDatabase()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    }); //liston for error also
  })
  .catch((error) => {
    console.log("MongoDb connection failed", error);
  });

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
