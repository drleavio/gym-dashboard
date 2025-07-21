const express=require("express");
const Admin=require("../schema/adminSchema")
const dbConnect=require("../connectDB/dbConnect")
const router=express.Router();


router.post("/signup",async(req,res)=>{
    const {email,password}=req.body;
    try {
        await dbConnect()
        const userExist=await Admin.findOne({email});
        if(userExist){
            return res.json({
                msg:"user already exist"
            })
        }
        const admin=new Admin({
            email,
            password
        })
        await admin.save();
        return res.json({
            msg:"signed up success"
        })
    } catch (error) {
        console.log(error);
        
        return res.json({
            msg:"error"
        })
    }
  
})

module.exports=router