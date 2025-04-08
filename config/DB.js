import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_DB_URI}`
    );

    console.log(`connected to mongo DB ${connectionInstance.connection.host}`);
  } catch (err) {
    console.log(err.message);
  }
};

export default connectDB;
