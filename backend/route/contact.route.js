import express from "express";
import { sendMessage, getAllMessages, deleteMessage } from "../controller/contact.controller.js";

const router = express.Router();

// POST → from Contact page
router.post("/", sendMessage);

// GET → for Admin Messages section
router.get("/", getAllMessages);

// DELETE → for Admin delete button
router.delete("/:id", deleteMessage);

export default router;
