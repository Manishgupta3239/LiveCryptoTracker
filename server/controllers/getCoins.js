import axios from "axios";
import currentData from "../models/CurrentDataModel.js";
import historyData from "../models/HistoryDataModel.js";

export const getCoins = async (req, res) => {
  try {
    // api call
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept-Encoding": "gzip, deflate, compress",
        },
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
        },
      }
    );
    console.log(response);
    if (response.data.length > 0) {
      for (const coin of response.data) {
        await currentData.findOneAndUpdate(
          { coinId: coin.id },
          {
            $set: {
              coinId: coin.id,
              name: coin.name,
              symbol: coin.symbol,
              image: coin.image,
              price: coin.current_price,
              marketCap: coin.market_cap,
              change24h: coin.price_change_percentage_24h,
              ranking: coin.market_cap_rank,
            },
          },
          { new: true, upsert: true }
        );
        console.log("fetched live data");
      }
    }
  } catch (error) {
    console.log("api error =>",error);
    console.error("api failed", error.message);
  }

  try {
    const coins = await currentData.find();
    console.log("data fetched from mongoose");
    return res.status(200).json({ data: coins });
  } catch (error) {
    console.log("DB  failed:", error.message);
    return res.status(500).json({ error: "Failed to fetch coin data from DB" });
  }
};

export const coinsHistory = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
        },
      }
    );
    if (response.data.length > 0) {
      for (const coin of response.data) {
        await historyData.create({
          coinId: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          image: coin.image,
          price: coin.current_price,
          marketCap: coin.market_cap,
          change24h: coin.price_change_percentage_24h,
          ranking: coin.market_cap_rank,
          high24: coin.high_24h,
          low24: coin.low_24h,
          totalVolume: coin.total_volume,
        });
      }
      console.log("api hit after 1 min");
      res.status(200).json({ message: "data saved" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const coinsHistoryById = async (req, res) => {
  const { coinId } = req.params;
  console.log(coinId);
  try {
    const data = await historyData.find({ coinId }).sort({ createdAt: -1 });
    if (data.length == 0) {
      return res.status(404).json({ message: "No data found" });
    }
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).error({ error: "server error .." });
  }
};
