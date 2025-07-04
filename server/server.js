import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";

//dotenv.config();
const port = 3000;
const app = express();
await connectDB();
//Middleware
app.use(express.json());
app.use(cors());

//API Routes
app.get("/", (req, res) => {
  res.send("Server is Live!");
});

//Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
