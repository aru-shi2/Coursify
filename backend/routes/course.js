const {Router}=require("express");
const {userAuth}=require("../middleware/userAuth")
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const {z}=require("zod")
const JWT_SECRET=process.env.SECRET_KEY;
const {CourseModel,PurchaseModel, UserModel}=require("../db")

const courseRouter=Router();

courseRouter.post("/purchase/:courseid", userAuth, async function(req,res){
    const courseId=req.params.courseid;
      const userId=req.userId;
      try {
          await UserModel.updateOne(
            {_id:userId},
            {
              "$push":{
                purchasedCourse: courseId
              }
            }
          )
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