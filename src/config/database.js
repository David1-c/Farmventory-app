// db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    mongoose.connect(process.env.MONGODB_URL)
  .then(() =>{
    console.log("DB connected!...");
  })
  .catch((err) => console.log(err));
}

  export default connectDB;
