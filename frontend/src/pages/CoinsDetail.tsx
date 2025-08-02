import  { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Calendar, Crown, Zap } from 'lucide-react';
import UseCryptoStore from '../store/cryptoStore';
import { useParams } from 'react-router-dom';

const CoinDetails = () => {
  
  const [animatedPrice, setAnimatedPrice] = useState(0);
  const { coins ,loading ,fetchCoinsHistory} = UseCryptoStore();
  type Params = {
  name: string;
};

  const {name}  = useParams<Params>();
  // Sample data (in real app, this would come from API)
  const coinData = {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "image": "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    "current_price": 118451,
    "market_cap": 2357234544105,
    "market_cap_rank": 1,
    "fully_diluted_valuation": 2357234544105,
    "total_volume": 45805676126,
    "high_24h": 118865,
    "low_24h": 116079,
    "price_change_24h": 125.1,
    "price_change_percentage_24h": 0.10572,
    "market_cap_change_24h": 3335876377,
    "market_cap_change_percentage_24h": 0.14172,
    "circulating_supply": 19899771,
    "total_supply": 19899771,
    "max_supply": 21000000,
    "ath": 122838,
    "ath_change_percentage": -3.49568,
    "ath_date": "2025-07-14T07:56:01.937Z",
    "atl": 67.81,
    "atl_change_percentage": 174720.39755,
    "atl_date": "2013-07-06T00:00:00.000Z",
    "roi": null,
    "last_updated": "2025-07-31T10:32:15.414Z"
  };

  useEffect(() => {
    fetchCoinsHistory(name);
  }, [fetchCoinsHistory , name])
  console.log(coins)

  // Price animation effect
  // useEffect(() => {
  //   let start = 0;
  //   const end = coinData.current_price;
  //   const duration = 2000;
  //   const startTime = Date.now();

  //   const animate = () => {
  //     const elapsed = Date.now() - startTime;
  //     const progress = Math.min(elapsed / duration, 1);
  //     const easeOut = 1 - Math.pow(1 - progress, 3);
      
  //     setAnimatedPrice(Math.floor(start + (end - start) * easeOut));
      
  //     if (progress < 1) {
  //       requestAnimationFrame(animate);
  //     }
  //   };
    
  //   animate();
  // }, [coinData.current_price]);
  

  const formatNumber = (num:number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toLocaleString()}`;
  };

  const formatPercentage = (percentage) => {
    const isPositive = percentage >= 0;
    return (
      <span className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        {Math.abs(percentage).toFixed(2)}%
      </span>
    );
  };

  const supplyPercentage = (coinData.circulating_supply / coinData.max_supply) * 100;

  return (
    loading?(<div className='h-screen w-full flex justify-center items-center'>loading...</div>):
    coins.length == 0 ? (<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex justify-center item">No data found</div>):<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Crypto Dashboard
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar size={16} />
            Last updated: {new Date(coins[0].updatedAt).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Main Coin Card */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-8 mb-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={coinData.image} 
                alt={coinData.name}
                className="w-16 h-16 rounded-full ring-4 ring-orange-400/30"
              />
              <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                <Crown size={12} />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold">{coinData.name}</h2>
              <p className="text-gray-400 uppercase text-lg">{coinData.symbol}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-orange-400 mb-2">
              ${animatedPrice.toLocaleString()}
            </div>
            <div className="flex items-center gap-2">
              {formatPercentage(coinData.price_change_percentage_24h)}
              <span className="text-gray-400 text-sm">24h</span>
            </div>
          </div>
        </div>

        {/* Price Range */}
        <div className="bg-slate-800/30 rounded-xl p-4">
          <h3 className="text-sm text-gray-400 mb-3">24H Price Range</h3>
          <div className="relative">
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full transition-all duration-1000"
                style={{
                  width: `${((coinData.current_price - coinData.low_24h) / (coinData.high_24h - coinData.low_24h)) * 100}%`
                }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-red-400">${coinData.low_24h.toLocaleString()}</span>
              <span className="text-green-400">${coinData.high_24h.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Market Cap */}
        <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-sm mb-1">Market Cap</p>
              <p className="text-2xl font-bold">{formatNumber(coinData.market_cap)}</p>
              <div className="mt-2">
                {formatPercentage(coinData.market_cap_change_percentage_24h)}
              </div>
            </div>
            <BarChart3 className="text-blue-400" size={32} />
          </div>
        </div>

        {/* Volume */}
        <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-300 text-sm mb-1">24h Volume</p>
              <p className="text-2xl font-bold">{formatNumber(coinData.total_volume)}</p>
              <p className="text-sm text-gray-400 mt-2">Trading activity</p>
            </div>
            <Zap className="text-purple-400" size={32} />
          </div>
        </div>

        {/* All Time High */}
        <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm mb-1">All Time High</p>
              <p className="text-2xl font-bold">${coinData.ath.toLocaleString()}</p>
              <div className="mt-2">
                {formatPercentage(coinData.ath_change_percentage)}
              </div>
            </div>
            <TrendingUp className="text-green-400" size={32} />
          </div>
        </div>

        {/* Market Rank */}
        <div className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 backdrop-blur-sm border border-orange-500/30 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-300 text-sm mb-1">Market Rank</p>
              <p className="text-2xl font-bold">#{coinData.market_cap_rank}</p>
              <p className="text-sm text-gray-400 mt-2">Global ranking</p>
            </div>
            <Crown className="text-orange-400" size={32} />
          </div>
        </div>
      </div>

      {/* Supply Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supply Stats */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <PieChart className="text-blue-400" size={24} />
            Supply Information
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Circulating Supply</span>
              <span className="font-bold">{coinData.circulating_supply.toLocaleString()} BTC</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Supply</span>
              <span className="font-bold">{coinData.total_supply.toLocaleString()} BTC</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Max Supply</span>
              <span className="font-bold">{coinData.max_supply.toLocaleString()} BTC</span>
            </div>

            {/* Supply Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Supply Progress</span>
                <span>{supplyPercentage.toFixed(1)}%</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000"
                  style={{ width: `${supplyPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Historical Data */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="text-purple-400" size={24} />
            Historical Records
          </h3>
          
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-green-300 font-medium">All Time High</span>
                <span className="text-2xl font-bold text-green-400">
                  ${coinData.ath.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-400">
                {new Date(coinData.ath_date).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-red-300 font-medium">All Time Low</span>
                <span className="text-2xl font-bold text-red-400">
                  ${coinData.atl.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-400">
                {new Date(coinData.atl_date).toLocaleDateString()}
              </p>
              <p className="text-sm text-green-400 mt-1">
                +{coinData.atl_change_percentage.toLocaleString()}% from ATL
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 text-gray-400 text-sm">
        <p>Real-time cryptocurrency data • Built with React & Tailwind CSS</p>
      </div>
    </div>
  );
};

export default CoinDetails;

// import { useState, useEffect } from 'react';
// import { TrendingUp, TrendingDown, Search, RefreshCw } from 'lucide-react';

// const CryptoDetails = () => {
//   const [coins, setCoins] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // Sample data - replace this with your API call
//   const sampleCoins = [
//     {
//       "id": "bitcoin",
//       "symbol": "btc",
//       "name": "Bitcoin",
//       "image": "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
//       "current_price": 118451,
//       "market_cap": 2357234544105,
//       "market_cap_rank": 1,
//       "price_change_percentage_24h": 0.10572,
//       "total_volume": 45805676126
//     },
//     {
//       "id": "ethereum",
//       "symbol": "eth",
//       "name": "Ethereum",
//       "image": "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
//       "current_price": 3245.67,
//       "market_cap": 390234544105,
//       "market_cap_rank": 2,
//       "price_change_percentage_24h": -2.45,
//       "total_volume": 15805676126
//     },
//     {
//       "id": "binancecoin",
//       "symbol": "bnb",
//       "name": "BNB",
//       "image": "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
//       "current_price": 598.23,
//       "market_cap": 89234544105,
//       "market_cap_rank": 3,
//       "price_change_percentage_24h": 1.23,
//       "total_volume": 2805676126
//     }
//   ];

//   useEffect(() => {
//     // Simulate API call - replace with your actual API endpoint
//     const fetchCoins = async () => {
//       setIsLoading(true);
//       try {
//         // Replace this with your actual API call:
//         // const response = await fetch('your-backend-api/coins');
//         // const data = await response.json();
//         // setCoins(data);
        
//         // Simulating API delay
//         setTimeout(() => {
//           setCoins(sampleCoins);
//           setIsLoading(false);
//         }, 1000);
//       } catch (error) {
//         console.error('Error fetching coins:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchCoins();
//   }, []);

//   const handleRefresh = () => {
//     setIsLoading(true);
//     // Add your refresh logic here
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//   };

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     }).format(price);
//   };

//   const formatMarketCap = (marketCap) => {
//     if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
//     if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
//     if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
//     return `$${marketCap.toLocaleString()}`;
//   };

//   const filteredCoins = coins.filter(coin =>
//     coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Cryptocurrency Dashboard
//           </h1>
//           <p className="text-gray-600">Track your favorite cryptocurrencies</p>
//         </div>

//         {/* Controls */}
//         <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
//           <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
//             {/* Search */}
//             <div className="relative flex-1 max-w-md">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search coins..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>

//             {/* Refresh */}
//             <button
//               onClick={handleRefresh}
//               disabled={isLoading}
//               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
//             >
//               <RefreshCw className={`${isLoading ? 'animate-spin' : ''}`} size={16} />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Coins List */}
//         <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
//           {isLoading ? (
//             <div className="flex items-center justify-center py-12">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//               <span className="ml-3 text-gray-600">Loading coins...</span>
//             </div>
//           ) : (
//             <>
//               {/* Table Header */}
//               <div className="bg-gray-50 px-6 py-3 border-b">
//                 <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
//                   <div className="col-span-1">#</div>
//                   <div className="col-span-3">Name</div>
//                   <div className="col-span-2">Price</div>
//                   <div className="col-span-2">24h %</div>
//                   <div className="col-span-2">Market Cap</div>
//                   <div className="col-span-2">Volume (24h)</div>
//                 </div>
//               </div>

//               {/* Table Body */}
//               <div className="divide-y divide-gray-100">
//                 {filteredCoins.length === 0 ? (
//                   <div className="px-6 py-12 text-center text-gray-500">
//                     No coins found matching your search.
//                   </div>
//                 ) : (
//                   filteredCoins.map((coin) => (
//                     <div key={coin.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
//                       <div className="grid grid-cols-12 gap-4 items-center">
//                         {/* Rank */}
//                         <div className="col-span-1">
//                           <span className="text-gray-600 font-medium">#{coin.market_cap_rank}</span>
//                         </div>

//                         {/* Name & Image */}
//                         <div className="col-span-3 flex items-center gap-3">
//                           <img 
//                             src={coin.image} 
//                             alt={coin.name}
//                             className="w-8 h-8 rounded-full"
//                           />
//                           <div>
//                             <div className="font-semibold text-gray-900">{coin.name}</div>
//                             <div className="text-sm text-gray-500 uppercase">{coin.symbol}</div>
//                           </div>
//                         </div>

//                         {/* Price */}
//                         <div className="col-span-2">
//                           <span className="text-lg font-semibold text-gray-900">
//                             {formatPrice(coin.current_price)}
//                           </span>
//                         </div>

//                         {/* 24h Change */}
//                         <div className="col-span-2">
//                           <div className={`flex items-center gap-1 ${
//                             coin.price_change_percentage_24h >= 0 
//                               ? 'text-green-600' 
//                               : 'text-red-600'
//                           }`}>
//                             {coin.price_change_percentage_24h >= 0 ? (
//                               <TrendingUp size={16} />
//                             ) : (
//                               <TrendingDown size={16} />
//                             )}
//                             <span className="font-medium">
//                               {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
//                             </span>
//                           </div>
//                         </div>

//                         {/* Market Cap */}
//                         <div className="col-span-2">
//                           <span className="text-gray-900 font-medium">
//                             {formatMarketCap(coin.market_cap)}
//                           </span>
//                         </div>

//                         {/* Volume */}
//                         <div className="col-span-2">
//                           <span className="text-gray-700">
//                             {formatMarketCap(coin.total_volume)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="mt-8 text-center text-gray-500 text-sm">
//           <p>Showing {filteredCoins.length} cryptocurrencies</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CryptoDetails;
