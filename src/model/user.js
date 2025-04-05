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
    type: String
  },
  location: {
    type: String
  },
  reviews: {
    type: [String], // Array of review comments
    default: [],
  },
  category: {
    type: String,
    enum: ["Fruits", "Vegetables", "Grains", "Dairy", "Livestock", "Others"]
  },
  role: {
    type: String,
    enum: ["Seller", "Buyer"]
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
