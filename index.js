const express = require('express')
const mongoose = require('mongoose')
const app = express();
const {
    MONGO_IP,
    MONGO_PORT,
    MONGO_USER,
    MONGO_PASSWORD, 
} = require('./config/config')
const port = process.env.PORT || 3000
let cors = require('cors')
const  userRouter = require("./routes/user")
const mongourl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
const mongodbWithRetry = ()=>{
    mongoose
    .connect(mongourl,{
    useNewUrlParser: true,
    })
    .then(()=>console.log("db connected"))
    .catch((err)=>{
    console.log(err)
    setTimeout(mongodbWithRetry,5000)
    })
}

mongodbWithRetry()

app.use(express.urlencoded({ extended: true}))
app.enable("trust proxy")

app.use(express.json())
app.enable("trust proxy")
app.get("/api/v1",(req,res)=>{
    console.log("it work!!!!")
    res.send("<h1>it ran</h1>")
})
app.use("/api/v1/user",userRouter);


app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})
