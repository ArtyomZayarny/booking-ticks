import express from "express";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import showRouter from "./routes/showRoutes.js";
//dotenv.config();
const port = 3000;
const app = express();
await connectDB();
//Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

//API Routes
app.get("/", (req, res) => {
  res.send("Server is Live!");
});
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/shows", showRouter);
//Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
