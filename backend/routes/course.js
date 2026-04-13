const {Router}=require("express");
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const {z}=require("zod")

const courseRouter=Router();

courseRouter.post("/purchase", function(req,res){
    res.send({msg:"course endpoint"})
})

module.exports={
    courseRouter:courseRouter
}