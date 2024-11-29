import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongodb Connected !!");
  } catch (error) {
    console.log("mongodb Connection Error !!", error);
    process.exit(1);
  }
};

export default connectDB;
