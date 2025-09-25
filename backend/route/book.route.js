import express from "express";
import Book from "../models/book.model.js"; // make sure path is correct
import { getBook } from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getBook);

// Search route
router.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ message: "Query parameter 'q' is required" });
  }

  try {
    const books = await Book.find({
      name: { $regex: query, $options: "i" },
    }).limit(10);

    res.json(books);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
