const express = require('express')
const app = express()

const {adminRouter}=require("./routes/admin");
const {userRouter}=require("./routes/user");
const {courseRouter}=require("./routes/course");

app.use(express.json())

const mongoose= require("mongoose");

require('dotenv').config();

app.use("/api/v1/user",userRouter)
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/course",courseRouter)

async function main() {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("database connected!");
  app.listen(3000);
}
main();