import  { useEffect } from 'react'
import Spinner from '../components/Spinner'
import UseCryptoStore from '../store/cryptoStore';

const Dashboard = () => {
  const {fetchCoins , loading} = UseCryptoStore();

  useEffect(() => {
    fetchCoins();
   
  }, [fetchCoins])
  
  return (
    <div className='w-full h-screen flex flex-col py-6 px-10'>
      {/* header */}
        <div className='text-black'>
            <h1 className='text-3xl font-bold'>Cryptocurrency Dashboard</h1>
            <p className='mt-3'>Track your favorite cryptocurrencies</p>
        </div>

        {/* serach bar */}
        <div className='flex justify-between items-center w-full h-20 bg-white mt-10 border-2 rounded-[10px] px-10'>
            <input placeholder='Search Coins...' className=' h-11 w-96 border-slate-500 border-1 px-4 rounded-[10px]'></input>
            <button className='bg-blue-600 h-11 w-28 rounded-[10px] text-[20px] flex justify-center items-center text-white hover:bg-blue-700'>Refresh</button>
        </div>

        {/* data */}
        <div className='w-full border-black border-2 h-96 mt-12 rounded-[10px] overflow-auto'>
            {loading ? (<div className='h-full w-full flex justify-center items-center'>
              <Spinner/>
            </div>):("")}
        </div>
    </div>
  )
}

export default Dashboard