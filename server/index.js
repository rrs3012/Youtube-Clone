import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import channels from "./routes/channels.js";
import auth from "./routes/auth.js";
import users from "./routes/users.js";
import videos from "./routes/videos.js";
import comments from "./routes/comments.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";


dotenv.config();


const app = express();

// MongoDB connection
const connect = () => {
    mongoose
      .connect(process.env.MONGO)
      .then(() => {
        console.log("DB connection successful 👍");
      })
      .catch((err) => {
        console.error("DB connection failed:", err);
      });
  };

// CORS for frontend 
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Cookie and JSON parser
app.use(cookieParser());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route handlers
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/videos", videos);
app.use("/api/channels", channels);
app.use("/api/comments", comments);

// Error handler
app.use((err,req,res,next)=> {
  const status = err.status || 500;
  const message = err.message || "Something went Wrong.";
  res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Launch server and connect to DB
const PORT = process.env.PORT || 7272;
app.listen(PORT, () => {
  connect();
  console.log(`Server started on port ${PORT}`);
});