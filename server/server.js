import express from "express";
import dotenv from "dotenv"
import coinsRoute from "./routes/coinsRoute.js";
import cors from "cors"
import { connectDb } from "./config/db.js";
import axios from "axios";
import cron from "node-cron";

dotenv.config();

const app = express();

app.use(cors({
  origin: ['https://cryptotracker-aee1b.web.app' , 'http://localhost:5173/' ],
  methods: ['GET', 'POST'],
  credentials: true,
}));


app.use(express.json());
app.use("/api" , coinsRoute);
// cron job run after 1hr
cron.schedule('0 * * * *', async () => {
   await axios.post("https://cryptotracker-aee1b.web.app/api/history");
   console.log("data saved");
});

connectDb();

app.listen(process.env.PORT, ()=>{
    console.log(` listing to port ${process.env.PORT}`);
})
