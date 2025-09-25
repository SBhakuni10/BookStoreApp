import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  image: { type: String },
}, { timestamps: true }); 
const Book = mongoose.model("Book", bookSchema);

export default Book;
