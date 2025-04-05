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
   
  },
  location: {
    title: {
      type: String, // e.g., "Gandhi Nagar, Delhi"     
    },
    latitude: {
      type: Number,    
    },
    longitude: {
      type: Number,
    }
  },  
  reviews: {
    type: [String], // Array of review comments
    default: [],
  },
  category: {
    type: String,
    enum: ["Fruits", "Vegetables", "Grains", "Others"],
 
  },
  role: {
    type: String,
    enum: ["Seller", "Buyer"],

  },
  isOnboarded: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
