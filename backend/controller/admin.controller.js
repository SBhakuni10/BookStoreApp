import User from "../models/user.model.js";
import Book from "../models/book.model.js";
import Message from "../models/message.model.js";
import Order from "../models/Order.js"; // ✅ use this instead of Transaction

// ================================
// 📚 GET ALL BOOKS
// ================================
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (err) {
    console.error("Error fetching books:", err.message);
    res.status(500).json({ message: "Error fetching books" });
  }
};

// ================================
// 👤 GET ALL USERS
// ================================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// ================================
// ❌ DELETE USER
// ================================
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).json({ message: "Error deleting user" });
  }
};

// ================================
// 💬 GET ALL MESSAGES
// ================================
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err.message);
    res.status(500).json({ message: "Error fetching messages" });
  }
};

// ❌ DELETE MESSAGE
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    console.error("Error deleting message:", err.message);
    res.status(500).json({ message: "Error deleting message" });
  }
};

// ================================
// 💳 GET ALL TRANSACTIONS (ORDERS)
// ================================
export const getAllTransactions = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching transactions:", err.message);
    res.status(500).json({ message: "Error fetching transactions" });
  }
};

// ❌ DELETE TRANSACTION (ORDER)
export const deleteTransaction = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("Error deleting order:", err.message);
    res.status(500).json({ message: "Error deleting transaction" });
  }
};
