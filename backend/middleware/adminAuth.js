const jwt=require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET=process.env.ADMIN_JWT_SECRET;

async function adminAuth(req,res,next){
    const t=req.headers.authorization;
    const decodedInfo=jwt.verify(t,JWT_SECRET);
    if(decodedInfo){
        req.adminId=decodedInfo.id;
        next()
    }else{
        return res.status(401).json({
            message:"You are not signed up"
        })
    }
}

module.exports={
    adminAuth
}