import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    book: Object,
    userEmail: String,
    amount: Number,
    currency: String,
    status: { type: String, default: "pending" },
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
