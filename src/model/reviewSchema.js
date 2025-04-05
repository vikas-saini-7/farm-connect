import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Seller", "Buyer"],
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
