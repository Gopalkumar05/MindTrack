import express from "express"
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import path from "path";
import { fileURLToPath } from "url";
import todoRoutes from './routes/todoRoutes.js'

dotenv.config();
const app=express()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin:process.env.frontend
}))
app.use(express.json())


mongoose.connect(process.env.Mongodb).then(()=>{
    console.log("Database Connected")
}).catch(()=>{
    console.log("Data is not connected some error in databaseconnection")
})

app.use('/api',todoRoutes)



const frontendPath = path.join(__dirname, "../frontend/dist"); 

app.use(express.static(frontendPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});


app.listen(process.env.Port,()=>{
    console.log("Server Started ")
})
