import express from "express";
import {
  getAllUsers,
  deleteUser,
  getAllBooks,
  getAllMessages,
  deleteMessage,
  getAllTransactions,
  deleteTransaction,
} from "../controller/admin.controller.js";

const router = express.Router();

// User management
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

// Book management
router.get("/books", getAllBooks);

// Message management
router.get("/messages", getAllMessages);
router.delete("/messages/:id", deleteMessage);

// Transaction management
router.get("/transactions", getAllTransactions);
router.delete("/transactions/:id", deleteTransaction);

export default router;
