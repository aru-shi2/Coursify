const jwt=require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET=process.env.USER_JWT_SECRET;

async function userAuth(req,res,next){
    const t=req.headers.authorization;
    const decodedInfo=jwt.verify(t,JWT_SECRET);
    if(decodedInfo){
        req.userId=decodedInfo.id;
        next()
    }else{
        return res.status(401).json({
            message:"You are not signed up"
        })
    }
}

module.exports={
    userAuth
}