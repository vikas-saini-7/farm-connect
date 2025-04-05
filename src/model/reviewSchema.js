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
    enum: ["Seller", "Buyer"], // Reviewed user's role
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // The person who is being reviewed
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // The person who gave the review
  },
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
