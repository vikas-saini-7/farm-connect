import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
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
  contactNumber: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  reviews: {
    type: [String], // Array of review comments
    default: [],
  },
  category: {
    type: String,
    enum: ["Fruits", "Vegetables", "Grains", "Dairy", "Livestock", "Others"],
    required: true,
  },
  role: {
    type: String,
    enum: ["Seller", "Buyer"],
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
