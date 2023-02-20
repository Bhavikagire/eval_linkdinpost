const express = require("express")
const userRouter = express.Router()
const { userModel } = require("../models/usermodel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



userRouter.get("/", async (req, res) => {
    try {
        let user = await userModel.find()
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})


userRouter.post("/register", async (req, res) => {

    const { name, email, password, gender,age,city } = req.body

    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            res.send("User already exist, please login")
        }
        else{
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) res.send(err)
                else {
                    const user = new userModel({name, email, gender,age,city,password: hash })
                    await user.save()
                    res.send("user register")
                }
            })
        }
       

    } catch (error) {
        res.send(error)
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userID: user[0]._id }, "masai")
                    res.send({ "msg": "login success", "token": token })
                }
                else {
                    res.send("wrong details")
                }
            })
        }
        else {
            res.send("something is wrong")
        }
    } catch (error) {
        res.send(error)
    }
})


module.exports = { userRouter }