import axios from "axios";

export const getCoins = async (req,res)=>{
    try{
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

        return res.json({data: response.data})
    }catch(error){
        console.log(error);
    }
}