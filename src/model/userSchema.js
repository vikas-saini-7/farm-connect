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
  // reviews:[ {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Review"
  // }],
  reviews: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }],
    default: []
  },
  categories: [{
    type: String,
    enum: ['vegetables', 'fruits', 'grains', 'pulses', 'spices', 'dairy', 'livestock']
  }],
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

export default mongoose.models?.User || mongoose.model("User", UserSchema);
