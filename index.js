const express = require("express")
require("dotenv").config()
const app = express()
app.use(express.json())

const cors = require("cors")
app.use(cors())

const {userRouter} = require("./routers/userroute")
app.use("/users",userRouter)
const {connection}=require("./db")



const {authenticate}=require("./middleware/authenticatemid")
app.use(authenticate)
const{postRouter}= require("./routers/postroute")
app.use("/post",postRouter)
app.get("/",(req,res)=>{
    res.send("welcome to full stack app")
})

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected with database")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running at ${process.env.PORT} port `)
})