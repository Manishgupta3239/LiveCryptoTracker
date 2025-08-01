import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import UseCryptoStore from "../store/cryptoStore";
import { TrendingUp, TrendingDown, Search, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { fetchCoins, loading, coins } = UseCryptoStore();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(()=>{
      console.log("run every 30 minutes...");
        fetchCoins();
    },1000*60*30);
     return ()=> clearInterval(interval);
  }, [fetchCoins]);

  function formatMarketCap(value: number) {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value.toLocaleString()}`;
  }

  return (
    <div className="w-full h-screen flex flex-col py-6 px-10">
      {/* header */}
      <div className="text-black">
        <h1 className="text-3xl font-bold">Cryptocurrency Dashboard</h1>
        <p className="mt-3">Track your favorite cryptocurrencies</p>
      </div>

      {/* serach bar */}
      <div className="flex justify-between items-center w-full h-20 bg-white mt-10 border-2 rounded-[10px] px-5">
        <div className="relative w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            placeholder="Search Coins..."
            className="h-11 w-full pl-10 pr-3 rounded-[10px] border border-slate-300"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        <button
          className="bg-blue-600 h-11 w-28 rounded-[10px] text-[20px] flex justify-center items-center text-white hover:bg-blue-700"
          onClick={() => {
            fetchCoins();
          }}
        >
          <RefreshCw /> Refresh
        </button>
      </div>

      {/* data */}
      <div className="w-full border-black border-2 h-96 mt-12 rounded-[10px] overflow-auto">
        {loading ? (
          <div className="h-full w-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : coins.length > 0 ? (
          search ? (
            coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase())).map((coin) => (
                <div
                  key={coin.name}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    navigate(`/${coin.name}`);
                  }}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Rank */}
                    <div className="col-span-1">
                      <span className="text-gray-600 font-medium">
                        {/* #{coin.market_cap_rank} */}
                      </span>
                    </div>

                    {/* Name & Image */}
                    <div className="col-span-3 flex items-center gap-3">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {coin.name}
                        </div>
                        <div className="text-sm text-gray-500 uppercase">
                          {coin.symbol}
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2">
                      <span className="text-lg font-semibold text-gray-900">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(coin.price)}
                      </span>
                    </div>

                    {/* 24h Change */}
                    <div className="col-span-2">
                      <div
                        className={`flex items-center gap-1 ${
                          coin.change24h >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {coin.change24h >= 0 ? (
                          <TrendingUp size={16} />
                        ) : (
                          <TrendingDown size={16} />
                        )}
                        <span className="font-medium">
                          {Math.abs(coin.change24h).toFixed(2)}%
                        </span>
                      </div>
                    </div>

                    {/* Market Cap */}
                    <div className="col-span-2">
                      <span className="text-gray-900 font-medium">
                        {formatMarketCap(coin.marketCap)}
                      </span>
                    </div>

                    {/* Volume */}
                    <div className="col-span-2">
                      <span className="text-gray-700">
                        {new Date(coin.updatedAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            coins.map((coin) => (
              <div
                key={coin.name}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  navigate(`/${coin.name}`);
                }}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Rank */}
                  <div className="col-span-1">
                    <span className="text-gray-600 font-medium">
                      {/* #{coin.market_cap_rank} */}
                    </span>
                  </div>

                  {/* Name & Image */}
                  <div className="col-span-3 flex items-center gap-3">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">
                        {coin.name}
                      </div>
                      <div className="text-sm text-gray-500 uppercase">
                        {coin.symbol}
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2">
                    <span className="text-lg font-semibold text-gray-900">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(coin.price)}
                    </span>
                  </div>

                  {/* 24h Change */}
                  <div className="col-span-2">
                    <div
                      className={`flex items-center gap-1 ${
                        coin.change24h >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {coin.change24h >= 0 ? (
                        <TrendingUp size={16} />
                      ) : (
                        <TrendingDown size={16} />
                      )}
                      <span className="font-medium">
                        {Math.abs(coin.change24h).toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* Market Cap */}
                  <div className="col-span-2">
                    <span className="text-gray-900 font-medium">
                      {formatMarketCap(coin.marketCap)}
                    </span>
                  </div>

                  {/* Volume */}
                  <div className="col-span-2">
                    <span className="text-gray-700">
                      {new Date(coin.updatedAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <p>No data found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
