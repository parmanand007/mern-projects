const express = require('express')
const app = express()
const MongoDB=require("./db")
const port = 5000
//allow cross origin

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With,Content-Type,Accept"    
    );
    next();
})


app.get("/",(req,res)=>{
    res.send("hello backend go food")
})
app.use(express.json())
//router
app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))
app.listen(port,()=>{
    console.log(`backend listenning on port ${port}`)
})