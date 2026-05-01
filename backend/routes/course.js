const {Router}=require("express");
const {userAuth}=require("../middleware/userAuth")
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const {z}=require("zod")
const JWT_SECRET=process.env.SECRET_KEY;
const {CourseModel,PurchaseModel}=require("../db")

const courseRouter=Router();

courseRouter.post("/purchase/:courseid", userAuth, async function(req,res){
    const courseId=req.params.courseid;
      const userId=req.userId;
      try {
          const purchased=await PurchaseModel.create({
        courseId:courseId,
        userId:userId
      })
      return res.json({
        message:"Course purchased successfully"
      })
      } catch (error) {
        res.json({
        message:"something went wrong"
      })
      }
})

courseRouter.get("/all",async function(req,res){
    const allCourses=await CourseModel.find({});
    res.json({
        allCourses
    })
})

module.exports={
    courseRouter:courseRouter
}