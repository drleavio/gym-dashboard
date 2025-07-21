const express = require("express");
const cors = require("cors"); // ✅ Import cors properly
require('dotenv').config({path:"../.env"});
const userRoute=require("../userRoute/userRoute")
const authRoute=require("../authRoute/authRoute")
const app=express();
app.use(express.json());
app.use(cors())
// console.log(process.env.MONGO_URI);

app.use("/api/auth",authRoute)
app.use("/api",userRoute);


app.listen(5732,()=>{
    console.log("listening");
    
});