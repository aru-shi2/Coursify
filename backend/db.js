const mongoose= require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=new mongoose.Types.ObjectId();

const User=new Schema({
    userEmail:{type: String, required: true, unique: true},
    password:String,
    firstName: String,
    lastName: String
})

const Admin= new Schema({
    adminEmail:{type: String, required: true, unique: true},
    password:String,
    firstName:String,
    lastName: String
})

const Course= new Schema({
    title:String,
    description:String,
    price:Number,
    imageLink:String,
    adminId: ObjectId
})

const Purchase=new Schema({
    courseId:ObjectId,
    userId:ObjectId
})

const UserModel=mongoose.model("users",User);
const AdminModel=mongoose.model("admin",Admin);
const CourseModel=mongoose.model("course",Course);
const PurchaseModel=mongoose.model("purchase",Purchase);

module.exports={
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}