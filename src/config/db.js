import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoose connected succesfully");
  } catch (err) {
    console.error(err.message);
    // process.exit(1);
  }
}
export default connectDB;
