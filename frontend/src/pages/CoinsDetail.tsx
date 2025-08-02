import { useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  Crown,
  Zap,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import UseCryptoStore from "../store/cryptoStore";
import { useNavigate, useParams } from "react-router-dom";

const CoinDetails = () => {
  const { loading, coins, fetchCoinsHistory } = UseCryptoStore();
  const navigate = useNavigate();
  const { coinId } = useParams();
  console.log("id", coinId);
  
  useEffect(() => {
    fetchCoinsHistory(coinId);
  }, [fetchCoinsHistory, coinId]);

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num}`;
  };

  const formatPercentage = (percentage: number) => {
    const isPositive = percentage >= 0;
    return (
      <span
        className={`flex items-center gap-1 ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        {Math.abs(percentage).toFixed(2)}%
      </span>
    );
  };

  return loading ? (
    <div className="flex h-screen w-full justify-center items-center">
      Loading...
    </div>
  ) : coins.length == 0 ? (
    <div className="flex h-screen w-full justify-center items-center">
      No data found
    </div>
  ) : (
    <div className="w-full min-h-screen bg-gray-50 py-6 px-4 md:px-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-black">
              Cryptocurrency Details
            </h1>
            <p className="mt-1 text-gray-600">Track detailed information</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            Last updated: {new Date(coins[0].updatedAt).toLocaleString()}
          </div>
          <button
            className="bg-blue-600 h-11 px-6 rounded-[10px] text-white flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50"
            onClick={() => fetchCoinsHistory()}
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {/* Main Coin Card */}
      <div className="bg-white border-2 border-gray-200 rounded-[10px] p-8 mb-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={coins[0].image}
                alt={coins[0].name}
                className="w-16 h-16 rounded-full"
              />
              {coins[0].marketCap === 1 && (
                <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                  <Crown size={12} className="text-white" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {coins[0].name}
              </h2>
              <p className="text-gray-600 uppercase text-lg">
                {coins[0].symbol}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              ${coins[0].price.toLocaleString()}
            </div>
            <div className="flex items-center gap-2">
              {formatPercentage(coins[0].change24h)}
              <span className="text-gray-500 text-sm">24h</span>
            </div>
          </div>
        </div>

        {/* Price Range */}
        <div className="bg-gray-50 border border-gray-200 rounded-[10px] p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            24hr Price Change
          </h3>
          <div className="relative">
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-red-600 font-medium">
                {coins[0].change24h} %
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
        {/* Market Cap */}
        <div className="bg-white border-2 border-gray-200 rounded-[10px] p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1 font-medium">
                Market Cap
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(coins[0].marketCap)}
              </p>
              
            </div>
            <BarChart3 className="text-blue-600" size={32} />
          </div>
        </div>

        {/* Volume */}
        <div className="bg-white border-2 border-gray-200 rounded-[10px] p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1 font-medium">
                Total Volume
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(coins[0].totalVolume)}
              </p>
              <p className="text-sm text-gray-500 mt-2">Trading activity</p>
            </div>
            <Zap className="text-purple-600" size={32} />
          </div>
        </div>

        {/* Market Rank */}
        <div className="bg-white border-2 border-gray-200 rounded-[10px] p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1 font-medium">
                Market Rank
              </p>
              <p className="text-2xl font-bold text-gray-900">
                #{coins[0].ranking}
              </p>
              <p className="text-sm text-gray-500 mt-2">Global ranking</p>
            </div>
            <Crown className="text-yellow-600" size={32} />
          </div>
        </div>
      </div>

      {/* Supply Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supply Stats */}

        {/* Historical Data */}
        <div className="bg-white border-2 border-gray-200 rounded-[10px] p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="text-purple-600" size={24} />
            Historical Records
          </h3>

          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-[10px] p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-green-700 font-medium">24hr High</span>
                <span className="text-2xl font-bold text-green-600">
                  ${coins[0].high24}
                </span>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-[10px] p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-red-700 font-medium">24hr Low</span>
                <span className="text-2xl font-bold text-red-600">
                  ${coins[0].low24}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;
