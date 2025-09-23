import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async(MONGO_URI)=>{
    try{
        await mongoose.connect(MONGO_URI)
        console.log("MongoDB connected");
    }catch(err){
        console.log(err);
        process.exit(1);
    }

}
export default connectDB;