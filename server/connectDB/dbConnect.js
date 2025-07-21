const mongoose=require("mongoose")

const dbConnect=async()=>{
    // console.log("uri new",process.env.WHATSAPP);
    
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
          .then(() => console.log('MongoDB connected'))
          .catch((err) => console.error('MongoDB connection error:', err));
        
    } catch (error) {
        console.log(error,"error connection database");
        
    }
}

module.exports=dbConnect