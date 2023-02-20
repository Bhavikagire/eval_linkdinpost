const express = require("express")
const postRouter = express.Router()


const {postModel} = require("../models/postmodel")

postRouter.get("/", async (req, res) => {
    let query = req.query
    try {
        let post = await postModel.find(query)
        res.send(post)
    } catch (error) {
        res.send(error)
    }
})


// postRouter.get("/top", async (req, res) => {
    
//     try {
//         let post = await postModel.find({comments})
//         res.send(post)
//     } catch (error) {
//         res.send(error)
//     }
// })

postRouter.post("/create",async(req,res)=>{
    const payload = req.body
   try {
    const post = new postModel(payload)
    await post.save() 
    res.send({"msg":"new post created"})
   } catch (error) {
    res.send({"msg":error.message})
   }
})




postRouter.delete("/delete/:id", async (req, res) => {
    const ID = req.params.id

    try {
        await postModel.findByIdAndDelete({ _id: ID })
        res.send("post deleted")

    } catch (error) {
        res.send(error)
    }
})

postRouter.patch("/update/:id", async (req, res) => {
    const ID = req.params.id
    const payload = req.body
    try {
        await postModel.findByIdAndUpdate({ _id: ID }, payload)
        res.send("post updated")

    } catch (error) {
        res.send(error)
    }
})

module.exports={postRouter}