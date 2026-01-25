import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found");
    }

    const conn = await mongoose.connect(
      `${process.env.MONGO_URI}/Vibely`
    );

    console.log("MongoDB connected:", conn.connection.host);
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
    // process.exit(1);
  }
};
