import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['vegetables', 'fruits', 'grains', 'pulses', 'spices', 'dairy', 'livestock'], // Defined categories
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // Store image URL (can use Cloudinary, Firebase, etc.)
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
