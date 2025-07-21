const express = require("express");
const userRoute=require("../userRoute/userRoute")
const authRoute=require("../authRoute/authRoute")
const app=express();
app.use(express.json());

app.use("/api/auth",authRoute)
app.use("/api",userRoute);


app.listen(3000,()=>{
    console.log("listening");
    
});