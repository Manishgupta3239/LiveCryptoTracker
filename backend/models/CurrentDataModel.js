import mongoose from "mongoose";

const currentDataSchema = new mongoose.Schema(
  {
    coinId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    image:{
      type: String,
    },
    symbol: {
      type: String,
      required: true,
      uppercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    marketCap: {
      type: Number,
      required: true,
    },
    change24h: {
      type: Number, 
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    ranking:{
      type:Number,
    }
  },
  {
    versionKey: false,
    timestamps:true
  }
);

// Optional: add index to coinId for faster upserts
currentDataSchema.index({ coinId: 1 }, { unique: true });

const currentData = mongoose.model("CurrentData", currentDataSchema);

export default currentData;