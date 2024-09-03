import mongoose from "mongoose";

//fungsi untuk connect ke mongoDB
export const connectDB = async (url) => {
  try {
    const res = await mongoose.connect(url);
    // console.log(`Connected : ${res.connection.host}`);
  } catch (error) {
    console.error(`Error : ${error.message}`);
  }
};
