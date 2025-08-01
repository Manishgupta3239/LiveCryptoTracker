
import { create } from "zustand";

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  last_updated: string;
}

interface CryptoState {
  coins: Coin[];
  loading: boolean;
//   error: string | null;
  fetchCoins: (id? : string , ) => Promise<void>;
}


const UseCryptoStore = create<CryptoState>((set)=>({
    coins:[],
    loading:false,
    fetchCoins : async()=>{
            try{
                set({loading:true});
                // const res = await axios.get('http://localhost:3000/api/coins');
                // set({coins : res.data});
                // console.log(res.data);
            }catch(error){
                console.log(error);
            }finally{
              // set({loading:false});
            }
        }
}))
export default UseCryptoStore;