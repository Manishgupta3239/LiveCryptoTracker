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
    high24:{
      type: Number, 
      required: true,
    },
    low24:{
      type: Number, 
      required: true,
    },
    totalVolume:{
      type: Number, 
      required: true,
    },
    ranking:{
      type: Number,
    }
  },
  {
    timestamps:true
  }
);

const historyData = mongoose.model("historyData", historyDataSchema);

export default historyData;