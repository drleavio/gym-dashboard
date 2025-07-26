const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", 
    required: true, 
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
  },
  whatsapp: {
    type: String,
    match: [/^\d{10}$/, "Please enter a valid 10-digit WhatsApp number"],
  },
  email: {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  subscription: {
    plan: {
      type: String,
      enum: ["monthly", "quarterly", "half-yearly", "yearly"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  payment: {
    status: {
      type: String,
      enum: ["paid", "pending", "failed"],
      default: "pending",
    },
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      enum: ['UPI', 'Card', 'NetBanking', 'Wallet', 'Cash'],
      default: "cash",
    },
    transactionId: {
      type: String,
      default: null,
    },
    paidOn: {
      type: Date,
    },
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  age: {
    type: Number,
  },
  address: {
    type: String,
  },
  emergencyContact: {
    name: String,
    phone: String,
  },
  goals: {
    type: [String], // e.g., ["weight loss", "muscle gain", "fitness"]
  },
  healthIssues: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
