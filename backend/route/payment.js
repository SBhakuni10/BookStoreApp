import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";
import { sendConfirmationEmail, sendFreeBookEmail } from "../utils/mailer.js";

const router = express.Router();

// ------------------- CREATE ORDER -------------------
router.post("/create-order", async (req, res) => {
  try {
    const { book, userEmail } = req.body;

    if (!book || !userEmail) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ success: false, message: "Payment gateway not configured" });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Handle free books
    if (Number(book.price) === 0) {
      const freeOrder = await Order.create({
        book,
        userEmail,
        amount: 0,
        currency: "INR",
        status: "paid",
      });

      // 1️⃣ Send confirmation email immediately
      await sendConfirmationEmail(userEmail, freeOrder);

      // 2️⃣ Send free book access after 10 seconds
      setTimeout(async () => {
        await sendFreeBookEmail(userEmail, {
          ...book,
          downloadUrl: book.downloadUrl || "https://example.com/free-book.pdf",
        });
      }, 10000); // 10 seconds

      return res.status(200).json({ success: true, message: "Free book order created", order: freeOrder });
    }

    // Paid book → create Razorpay order
    const amountInPaise = Math.round(Number(book.price) * 100);

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `order_${Date.now()}`,
    });

    const newOrder = await Order.create({
      book,
      userEmail,
      razorpay_order_id: razorpayOrder.id,
      amount: Number(book.price),
      currency: "INR",
      status: "pending",
    });

    res.status(200).json({ success: true, order: newOrder, razorpayOrder });
  } catch (err) {
    res.status(500).json({ success: false, message: "Order creation failed", error: err.message });
  }
});

// ------------------- VERIFY PAYMENT -------------------
router.post("/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing Razorpay fields" });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ success: false, message: "Payment verification not configured" });
    }

    // Generate signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const status = generatedSignature === razorpay_signature ? "paid" : "failed";

    // Update order in DB
    const updatedOrder = await Order.findOneAndUpdate(
      { razorpay_order_id },
      { razorpay_payment_id, razorpay_signature, status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // 1️⃣ Send confirmation email immediately
    if (status === "paid") {
      await sendConfirmationEmail(updatedOrder.userEmail, updatedOrder);
    }

    // 2️⃣ Send free book access after 10 seconds (if the book is free)
    if (Number(updatedOrder.amount) === 0) {
      setTimeout(async () => {
        await sendFreeBookEmail(updatedOrder.userEmail, {
          ...updatedOrder.book,
          downloadUrl: updatedOrder.book.downloadUrl || "https://example.com/free-book.pdf",
        });
      }, 10000); // 10 seconds
    }

    res.json({ success: true, message: "Payment verified", order: updatedOrder });
  } catch (err) {
    res.status(500).json({ success: false, message: "Verification error", error: err.message });
  }
});

export default router;
