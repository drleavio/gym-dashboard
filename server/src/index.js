const express = require("express");
const cors = require("cors");
require('dotenv').config({path:"../.env"});
const userRoute=require("../userRoute/userRoute")
const authRoute=require("../authRoute/authRoute")
const authCheck=require("../middleware")
const app=express();
app.use(express.json());
app.use(cors())

app.use("/api/auth",authRoute)
app.use("/api",authCheck,userRoute);


app.listen(5732,()=>{
    console.log("listening");   
});