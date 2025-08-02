import { Router } from "express";
import { coinsHistory, coinsHistoryById, getCoins } from "../controllers/getCoins.js";

const router = Router();

// get all coins
router.get('/coins',getCoins)

// post history of all coins
router.post('/history',coinsHistory)

// get history of particular coin
router.get('/history/:coinId',coinsHistoryById)

export default router;