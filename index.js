import express from "express"
import cors from "cors"
import 'dotenv/config';
import {MongoClient, ObjectId} from "mongodb"
const app = express();
const PORT = process.env.PORT || 5000;
const client = new MongoClient(process.env.MONGO_DB_URL);


app.use(cors())
app.use(express())

export async function ConnectDB(){
    try{
        await client.connect()
        console.log("Database Connected")
        return client;
    }
    catch(err){
        console.dir(err)
    }
}

const connectedDB = await ConnectDB()
const DB = connectedDB.db("SocialWork")
const userTable = DB.collection("user")
app.get("/",(req, res)=>{
    res.send("Iqunal Muslim")
})

app.get("/users", async(req,res)=>{
const users = await userTable.find().toArray()
res.send(users)
})

app.listen(PORT,()=>[console.log(`Hermono Server Run on ${PORT}`)])