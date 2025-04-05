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
  reviews:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }],
  category: {
    type: String,
    enum: ["Fruits", "Vegetables", "Grains", "Dairy", "Livestock" , "Others"],
 
  },
  role: {
    type: String,
    enum: ["Seller", "Buyer"],

  },
  certificate: {
    title: { type: String },
    issuedBy: { type: String },
    issuedOn: { type: Date },
    certificateUrl: { type: String },
  },
  isOnboarded: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
