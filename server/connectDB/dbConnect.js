const mongoose=require("mongoose")

const dbConnect=async()=>{
    try {
        await mongoose.connect("mongodb+srv://admin:ZJyKhlaE2Qoc087K@cluster0.k9sm2do.mongodb.net/gym?retryWrites=true&w=majority&appName=Cluster0")
        console.log("connect success");
        
    } catch (error) {
        console.log(error,"error connection database");
        
    }
}

module.exports=dbConnect