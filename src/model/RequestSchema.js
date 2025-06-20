import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  reqFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reqTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Request || mongoose.model("Request", requestSchema);
