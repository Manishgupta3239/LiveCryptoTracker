
import axios from "axios";
import { create } from "zustand";

export interface Coin {
  name: string;
  coinId: string;
  symbol: string;
  image: string;
  price: number;
  marketCap: number;
  change24h: number;
  updatedAt: string;
  ranking: number;
  high24:number;
  low24:number;
  totalVolume:number;
}

interface CryptoState {
  coins: Coin[];
  loading: boolean;
  fetchCoins: ( ) => Promise<void>;
  fetchCoinsHistory: (coinId?:string ) => Promise<void>;
}


const UseCryptoStore = create<CryptoState>((set)=>({
    coins:[],
    loading:false,
    fetchCoins : async()=>{
            try{
                set({loading:true});
                const res = await axios.get('https://livecryptotracker-xqz0.onrender.com/api/coins',{
                  withCredentials:true
                });
                set({coins : res.data.data});
                console.log(res.data.data);
            }catch(error){
                console.log(error);
            }finally{
              set({loading:false});
            }
        },
    fetchCoinsHistory: async(coinId)=>{
        try{
                set({loading:true});
                const res = await axios.get(`https://livecryptotracker-xqz0.onrender.com/api/history/${coinId}`,{
                  withCredentials:true
                });
                set({coins : res.data.data});
                console.log(res.data.data);
            }catch(error){
                console.log(error);
            }finally{
              set({loading:false});
            }
    }
}))
export default UseCryptoStore;