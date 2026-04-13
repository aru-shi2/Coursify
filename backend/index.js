const express = require('express')
const app = express()
const port = 3000
const {adminRouter}=require("./routes/admin");
const {userRouter}=require("./routes/user");
const {courseRouter}=require("./routes/user");
const mongoose= require("mongoose");
require('dotenv').config();

app.use(express.json());

const JWT_SECRET=process.env.SECRET_KEY;

mongoose.connect(process.env.DATABASE_URL)

app.use("/api/v1/user",userRouter)
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/course",courseRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
