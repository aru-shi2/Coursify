const {Router}=require("express");
const {UserModel}=require("./")
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const {z}=require("zod")
const JWT_SECRET=process.env.SECRET_KEY;

const userRouter=Router();

userRouter.post('/signup', async function(req, res) {

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

  const username=req.body.user;
  const password=req.body.pass;

  const hashedPass=await bcrypt.hash(password,5)

  await UserModel.create({
    username:username,
    password:hashedPass
  })

  res.json({
    msg:"admin created successfully!"
  })
});

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

  const checkUser=await UserModel.find({
    username:username,
  })

  if(!checkUser){
    res.status('403').json({
      msg:"Username not found!"
    })
  }

  const checkPass=await bcrypt.compare(password,check.password);

  if(checkPass){
    const token=jwt.sign({id:checkUser._id},JWT_SECRET);
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

userRouter.get('/purchase',function(req,res){
  
})

module.exports={
    adminRouter:userRouter
}