const express=require("express");
const User=require("../schema/userSchema");
const dbConnect=require("../connectDB/dbConnect");
const router=express.Router();



router.get("/allusers",async(req,res)=>{
    const user=req.user 
    const adminId=user.id

    try {
        await dbConnect()
        const response=await User.find({admin:adminId});
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

router.get("/user/:id",async(req,res)=>{
    const user=req.user 
    const adminId=user.id
    const userId=req.params.id;
    try {
        const response = await User.findOne({ _id: userId, admin: adminId });
        if(!response){
            return res.json({
                msg:"user not available"
            })
        }
        return res.json({
            msg:"user accessed",
            response
        })
    } catch (error) {
        return res.json({
            msg:"error fetching user"
        })
    }
})

router.post("/adduser",async(req,res)=>{
    const user=req.user 
    const adminId=user.id
    console.log(adminId);
    
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
        admin:adminId,
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
    const user=req.user 
    const adminId=user.id
    const { userId, status, transactionId, paidOn,paymentMethod } = req.body;
  
    try {
      await dbConnect()
      const user = await User.findById(userId,adminId);
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

  router.put("/updateuser", async (req, res) => {
    const user = req.user;
    const adminId = user.id;
  
    try {
      await dbConnect();
  
      const { id, ...updateFields } = req.body;
  
      if (!id) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const allowedFields = [
        "subscription",
        "email",
        "whatsapp",
        "address",
        "payment",
        "goals",
        "healthIssues",
        "emergencyContact",
        "age",
        "gender",
        "name",
        "phone",
      ];
  
      const updates = {};
  
      for (const field of allowedFields) {
        if (updateFields[field] !== undefined) {
          updates[field] = updateFields[field];
        }
      }
  
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No valid fields provided for update" });
      }
  
      const updatedUser = await User.findOneAndUpdate(
        { _id: id, admin: adminId }, 
        updates,
        {
          new: true,
          runValidators: true,
        }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found or unauthorized" });
      }
  
      res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  });
  
  

module.exports=router