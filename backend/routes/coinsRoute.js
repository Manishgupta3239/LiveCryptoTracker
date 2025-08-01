import { Router } from "express";
import { coinsHistory, getCoins } from "../controllers/getCoins.js";

const router = Router();

// get all coins
router.get('/coins',getCoins)

// post history of all coins
router.post('/history',coinsHistory)

// get history of particular coin
router.get('/history/:coinId',(req,res)=>{
    console.log("post route");
})

export default router;