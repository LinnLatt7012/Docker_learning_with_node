const express = require('express')
const mongoose = require('mongoose')
const app = express();
const port = process.env.PORT || 3000
const { MONGO_IP,MONGO_PORT,MONGO_USER,MONGO_PASSWORD } = require('./config/config')
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

app.get("/",(req,res)=>{
    res.send("<h2>Hi Hereaa</h2>")
})


app.listen(port, ()=>console.log(`listening on port ${port}`))