const {Router}=require("express");
const {AdminModel}=require("../db")
const {CourseModel}=require("../db")
const bcrypt=require("bcrypt")
const ObjectId= mongoose.Types.ObjectId;
const jwt=require('jsonwebtoken')
const {z}=require("zod")
require('dotenv').config();
const JWT_SECRET=process.env.ADMIN_JWT_SECRET;

const adminRouter=Router();

adminRouter.post('/signup', async function(req, res) {

  const users=z.object({
    user:z.string().email(),
    pass:z.string().min(6,"Password must be atleast 6 characters").regex(/[a-z]/, "Password must contain atleast one lowercase letter").regex(/[A-Z]/,"Password must contain atleast one uppercase letter").regex(/[0-9]/,"Password must contain atleast one number")
  })

  const parsedUsers=users.safeParse(req.body);

  if(!parsedUsers){
    res.json({
      msg:"incorrect format",
      error:parsedUsers.error.format()
    })
    return
  }

  const {user,pass,firstname,lastname}=req.body;

  const hashedPass=await bcrypt.hash(pass,5)

  try{
    await AdminModel.create({
    adminEmail:user,
    password:hashedPass,
    firstName:firstname,
    lastName:lastname
  })
  return res.json({
    msg:"admin created successfully!"
  })
}catch(e){
   return res.json({msg:"signup failed"})
  }

});

adminRouter.post('/login', async function(req, res) {

  const users=z.object({
    user:z.string().email(),
    pass:z.string().min(6,"Password must be atleast 6 characters")
  })

  const parsedUsers=users.safeParse(req.body);

  if(!parsedUsers){
    res.json({
      msg:"incorrect format",
      error:parsedUsers.error.format()
    })
    return
  }

  const username=req.body.user;
  const password=req.body.pass;

  const checkAdmin=await AdminModel.findOne({
    adminEmail:username,
  })

  if(!checkAdmin){
    res.status('403').json({
      msg:"Username not found!"
    })
  }

  const checkPass=await bcrypt.compare(password,checkAdmin.password);

  if(checkPass){
    const token=jwt.sign({id:checkAdmin._id},JWT_SECRET);
    res.json({
      token:token,
      msg:"Logged in successfully!"
    })
  }else(
    res.status('403').json({
      msg:"incorrect info"
    })
  )

});

app.use(adminAuth);

//create course
adminRouter.post('/course',async function(req,res){
  const id=req.adminId;
  const course=z.object({
    title:z.string(),
    description:z.string(),
    price:z.number(),
    imageLink:z.string(),
    adminId:z.string().refine(
      (val)=>ObjectId.isValid(val),
      {message:"invalid objectid"}
    )
  })

  const parsedCourse=course.safeParse(req.body);

  if(!parsedUsers){
    res.json({
      msg:"incorrect format",
      error:parsedUsers.error.format()
    })
    return
  }

  const {title,description,price,imageLink,adminId}=req.body

  try {
    const createCourse=await CourseModel.create({
      title:title,
      description:description,
      price:price,
      imageLink:imageLink,
      adminId:adminId
    })
    return res.json({
      message:"course created successfully!",
      courseId=createCourse._id
    })
  } catch (e) {
    return res.json({message:"Something went wrong!"})
  }
})


//update course
adminRouter.put('/course',async function(req,res){
  const adminId=req.adminId
  const [title,description,price,imageLink,courseId]=req.body;

  try{
  const updateCourse=await CourseModel.updateOne(
    {
      _id:courseId,
      adminId:adminId
    },
    {
      title:title,
      description:description,
      price:price,
      imageLink:imageLink,
    }
  )
  return res.json({
    message:"course updated!",
    courseId:courseId
  })
}catch(e){
  return res.json({message:"something went wrong"})
}
});


//delete course
adminRouter.delete('/course',function(req,res){
  const adminId=req.adminId
  const courseId=req.body.courseId

  try{  const delCourse=deleteOne(
      {_id:courseId}
    )
    res.json({
      message:"course deleted!",
    })
  }catch(e){
    res.json({message:"something went wrong"})
  }
})

//get all course
adminRouter.get('/course/all',async function(req,res){
  const adminId=req.adminId
  try{const allCourses=await CourseModel.find({adminId:adminId})
  return res.json({
    courses:allCourses,
    message:"all courses"
  })
}
  catch(e){
    res.json({message:"something went wrong!"})
  }
})

module.exports={
    adminRouter:adminRouter
}