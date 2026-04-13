const {Router}=require("express");
const {AdminModel}=require("./db")
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
const {z}=require("zod")

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

  const username=req.body.user;
  const password=req.body.pass;

  const hashedPass=await bcrypt.hash(password,5)

  await UserModel.create({
    admin:username,
    password:hashedPass
  })

  res.json({
    msg:"admin created successfully!"
  })
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

  const checkUser=await UserModel.find({
    admin:username,
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

adminRouter.post('/course',function(req,res){

})

adminRouter.put('/course',function(req,res){
  
})


module.exports={
    adminRouter:adminRouter
}