const express=require("express");
const User=require("../schema/userSchema");
const dbConnect=require("../connectDB/dbConnect");
const router=express.Router();



router.get("/allusers",async(req,res)=>{
    try {
        await dbConnect()
        const response=await User.find({});
        return res.status(200).json({
            msg:"data fetched successfully",
            response
        })
    } catch (error) {
        return res.status(204).json({
            msg:"error fetching data"
        })
    }
})

router.post("/adduser",async(req,res)=>{
   try {
    await dbConnect()
    const {
        name,
        phone,
        whatsapp,
        email,
        subscription,
        payment,
        gender,
        age,
        address,
        emergencyContact,
        goals,
        healthIssues,
      } = req.body;
  
      if (!name || !phone || !subscription || !payment) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const newUser = new User({
        name,
        phone,
        whatsapp,
        email,
        subscription,
        payment,
        gender,
        age,
        address,
        emergencyContact,
        goals,
        healthIssues,
      });
  
      const savedUser = await newUser.save();
      res.status(201).json({
        message: "User added successfully",
        user: savedUser,
      });
   } catch (error) {
    
   }
})

router.post("/update-status", async (req, res) => {
    const { userId, status, transactionId, paidOn,paymentMethod } = req.body;
  
    try {
      await dbConnect()
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
      const validMethods = ['UPI', 'Card', 'NetBanking', 'Wallet', 'Cash'];
        if (!validMethods.includes(paymentMethod)) {
        return res.status(400).json({ message: "Invalid payment method" });
        }
  
      user.payment.status = status;
      user.payment.transactionId = transactionId;
      user.payment.paidOn = paidOn;
      user.payment.method = paymentMethod;
  
      if (status === "paid") {
        const newEndDate = new Date();
        newEndDate.setMonth(newEndDate.getMonth() + 1);
  
        user.subscription.startDate = new Date();
        user.subscription.endDate = newEndDate;
        user.subscription.isActive = true;
      }
  
      await user.save();
      res.status(200).json({ message: "Payment updated and subscription renewed" });
    } catch (err) {
      console.error("Payment update failed", err);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports=router