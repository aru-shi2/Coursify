const {Router}=require("express");
const {UserModel}=require("../db")
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const {z}=require("zod")
require('dotenv').config();
const JWT_SECRET=process.env.JWT_SECRET ;

const userRouter=Router();

userRouter.post('/signup', async function(req, res) {

  const users=z.object({
    user:z.email(),
    pass:z.string().min(6,"Password must be atleast 6 characters").regex(/[a-z]/, "Password must contain atleast one lowercase letter").regex(/[A-Z]/,"Password must contain atleast one uppercase letter").regex(/[0-9]/,"Password must contain atleast one number")
  })

  const parsedUsers=users.safeParse(req.body);

  if(!parsedUsers){
    return res.json({
      msg:"incorrect format",
      error:parsedUsers.error.format()
    })
  }

  const {user, pass, firstname, lastname}=req.body;

  const hashedPass=await bcrypt.hash(pass,5)

  try{
    await UserModel.create({
    userEmail:user,
    password:hashedPass,
    firstName:firstname,
    lastName:lastname
  })
  return res.json({
    msg:"user created successfully!"
  })
}catch(e){
  console.log(e)
  return res.json({msg:"signup failed!"});
}
})

userRouter.post('/login', async function(req, res) {

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

  const checkUser=await UserModel.findOne({
    userEmail:username,
  })

  if(!checkUser){
    return res.status('403').json({
      msg:"Username not found!"
    })
  }

  const checkPass=await bcrypt.compare(password,checkUser.password);

  if(checkPass){
    const token=jwt.sign({id:checkUser._id},JWT_SECRET);
    return res.json({
      token:token,
      msg:"Logged in successfully!"
    })
  }else(
     res.status('403').json({
      msg:"incorrect info"
    })
  )

});

userRouter.get('/purchase',function(req,res){
  
})

module.exports={
  userRouter:userRouter
}