import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"], // only these two values allowed
    default: "user", // by default every signup is a normal user
  },
});

const User = mongoose.model("User", userSchema);
export default User;
