import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bookRoute from "./route/book.route.js";   // ✅ ensure correct folder name
import userRoute from "./route/user.route.js";
import paymentRoute from "./route/payment.js";




const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI; // ✅ match with .env key

// Middleware
app.use(cors());
app.use(express.json());



// Routes

app.use("/books", bookRoute);
app.use("/payment", paymentRoute);
app.use("/user", userRoute);

// MongoDB connection
mongoose
  .connect(URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
