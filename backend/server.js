import express from "express";
import dotenv from "dotenv"
import coinsRoute from "./routes/coinsRoute.js";
import cors from "cors"
import { connectDb } from "./config/db.js";


dotenv.config();

const app = express();

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());
app.use("/api" , coinsRoute);
connectDb();

app.listen(process.env.PORT, ()=>{
    console.log("listing to port 3000");
})

