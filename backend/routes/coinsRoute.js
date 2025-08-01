import { Router } from "express";
import { getCoins } from "../controllers/getCoins.js";

const router = Router();

router.get('/',getCoins)
router.post('/',(req,res)=>{
    console.log("post route");
})

export default router;