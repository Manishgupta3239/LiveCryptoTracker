import mongoose from "mongoose";

const historyDataSchema = new mongoose.Schema(
  {
    coinId: {
      type: String,
      required: true,
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
  },
  {
    versionKey: false,
    timestamps:true
  }
);

// Optional: add index to coinId for faster upserts
// historyDataSchema.index({ coinId: 1 }, { unique: true });

const historyData = mongoose.model("historyData", historyDataSchema);

export default historyData;