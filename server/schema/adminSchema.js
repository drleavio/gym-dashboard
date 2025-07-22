const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure no duplicate admin emails
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum length check
  },
  phone:{
    type:String,
    required:true,
    minlength:10,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
