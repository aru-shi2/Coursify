const mongoose= require("mongoose");
const Schema=mongoose.Schema

const User=new Schema({
    userEmail:{type: String, required: true, unique: true},
    password:String
})

const Admin= new Schema({
    adminEmail:{type: String, required: true, unique: true},
    password:String
})

const Course= new Schema({
    title:String,
    description:String,
    price:Number,
    imageLink:
})

const UserModel=mongoose.model("users",User);
const AdminModel=mongoose.model("admin",Admin);

module.exports={
    UserModel:UserModel,
    AdminModel:AdminModel
}