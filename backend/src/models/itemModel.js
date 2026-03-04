import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    itemName: { 
      type: String,
      required: true },
    category: { 
      type: String,
      required: true },
    description: String,
    location: String,
    status: {
      type: String,
      enum: ["Lost", "Found"]
    },
    contactName: String,
    contactNumber: String,
    date: { 
      type: Date,
      default: Date.now },
    remark: String,

    claimed: {
      type: String,
      enum: ["Yes", "No"],
      default: "No"
    },
    claimedBy: String,
    claimedDate: {
  type: Date
},
  },
  
  {
    timestamps: true
  }
);

export default mongoose.model("Item", itemSchema);

