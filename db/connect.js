import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  try {
    await mongoose.connect(uri);
    console.log("MongoDb connected successfully");
  } catch (error) {
    console.log("Error occured while Connecting ....");
    console.log(error);
    process.exit(1);
  }
};
