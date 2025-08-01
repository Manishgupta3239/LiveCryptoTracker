
import axios from "axios";
import { create } from "zustand";

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  marketCap: number;
  change24h: number;
  updatedAt: string;

}

interface CryptoState {
  coins: Coin[];
  loading: boolean;
  fetchCoins: (id? : string , ) => Promise<void>;
}


const UseCryptoStore = create<CryptoState>((set)=>({
    coins:[],
    loading:false,
    fetchCoins : async()=>{
            try{
                set({loading:true});
                const res = await axios.get('http://localhost:3000/api/coins');
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