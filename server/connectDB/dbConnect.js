const mongoose=require("mongoose")
require('dotenv').config();

const dbConnect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connect success");
        
    } catch (error) {
        console.log(error,"error connection database");
        
    }
}

module.exports=dbConnect