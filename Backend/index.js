import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectToMongo from "./db.js";
import authRoutes from "./Routes/auth.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth",authRoutes);

app.get("/",(req,res)=>{
    res.send("API is running...");
}
);


const start = async () => {
  try {
    await connectToMongo(MONGO_URI);
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  } catch (err) {
    console.log(err);
  }
};

start();