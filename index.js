const express = require("express")
require("dotenv").config()
const {userRouter} = require("./routers/userroute")
const {authenticate}=require("./middleware/authenticatemid")
const{postRouter}= require("./routers/postroute")
const cors = require("cors")
const {connection}=require("./db")

const app = express()

app.use(express.json())
app.use(cors())



app.get("/",(req,res)=>{
    res.send("welcome to full stack app")
})


app.use("/users",userRouter)

app.use(authenticate)

app.use("/post",postRouter)


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected with database")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running at ${process.env.PORT} port `)
})