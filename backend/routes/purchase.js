const {Router}=require("express");
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const {z}=require("zod")
const JWT_SECRET=process.env.SECRET_KEY;
const {PurchaseModel}=require("../db")

const purchaseRouter=Router();

purchaseRouter.post("/purchase", function(req,res){
    res.send({msg:"course endpoint"})
})

module.exports={
    purchaseRouter:purchaseRouter
}