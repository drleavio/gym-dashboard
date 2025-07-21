const express = require("express");
require('dotenv').config({path:"../.env"});
const userRoute=require("../userRoute/userRoute")
const authRoute=require("../authRoute/authRoute")
const app=express();
app.use(express.json());
console.log(process.env.MONGO_URI);

app.use("/api/auth",authRoute)
app.use("/api",userRoute);


app.listen(3000,()=>{
    console.log("listening");
    
});