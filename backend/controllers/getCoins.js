import axios from "axios";
import currentData from "../models/CurrentDataModel.js";
import historyData from "../models/HistoryDataModel.js";

//             "id": "bitcoin",
//             "symbol": "btc",
//             "name": "Bitcoin",
//             "image": "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
//             "current_price": 115329,
//             "market_cap": 2296431167605,
//             "market_cap_rank": 1,
//             "fully_diluted_valuation": 2296431167605,
//             "total_volume": 52322323148,
//             "high_24h": 118865,
//             "low_24h": 114980,
//             "price_change_24h": -3052.986251110822,
//             "price_change_percentage_24h": -2.57894,
//             "market_cap_change_24h": -59031190487.45557,
//             "market_cap_change_percentage_24h": -2.50614,
//             "circulating_supply": 19900140,
//             "total_supply": 19900140,
//             "max_supply": 21000000,
//             "ath": 122838,
//             "ath_change_percentage": -6.01414,
//             "ath_date": "2025-07-14T07:56:01.937Z",
//             "atl": 67.81,
//             "atl_change_percentage": 170158.12533,
//             "atl_date": "2013-07-06T00:00:00.000Z",
//             "roi": null,
//             "last_updated": "2025-08-01T06:32:41.516Z"
//         }

export const getCoins = async (req, res) => {
  try {
    // api call
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
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
      }
    }
  } catch (error) {
    console.log("API failed:", error.message);
  }

  try {
    const coins = await currentData.find();
    return res.status(200).json({ data: coins });
  } catch (dbError) {
    console.log("DB Read failed:", dbError.message);
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
  try {
    const data = await historyData.find({ coinId });
    if (data.length == 0) {
      return res.status(404).json({ message: "No data found" });
    }
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).error({ error: "server error .." });
  }
};
