import express from "express"
import cors from 'cors'
import mongoose from "mongoose"
import path from "path";
import { fileURLToPath } from "url";
import todoRoutes from './routes/todoRoutes.js'
const app=express()
const PORT=5000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(express.json())


mongoose.connect("mongodb://localhost:27017/Todo").then(()=>{
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


app.listen(PORT,()=>{
    console.log("Server Started ")
})