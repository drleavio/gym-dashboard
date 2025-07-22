const express = require("express");
const Admin = require("../schema/adminSchema")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dbConnect = require("../connectDB/dbConnect")
const twilio = require("twilio");
const nodemailer = require("nodemailer");
const router = express.Router();


router.post("/signup", async (req, res) => {
    const { email, password, phone } = req.body;

    try {
        await dbConnect();
        const userExist = await Admin.findOne({ $or: [{ email }, { phone }] });
        if (userExist) {
            return res.json({
                msg: "User already exists",
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const admin = new Admin({
            email,
            password: hashedPassword,
            phone,
        });

        await admin.save();

        return res.json({
            msg: "Signed up successfully",
        });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({
            msg: "Internal server error",
        });
    }
});


const otpStore = new Map();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "your-email@gmail.com",
        pass: "your-password",
    },
});

function generateOtp() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

router.post("/login", async (req, res) => {
    try {
        await dbConnect();
        const { email, password, phone } = req.body;

        if ((!email && !phone) || !password) {
            return res.status(400).json({ msg: "Email or phone and password required" });
        }

        let userExist;
        let identifier;

        if (email) {
            userExist = await Admin.findOne({ email });
            identifier = email;
        } else {
            userExist = await Admin.findOne({ phone });
            identifier = phone;
        }

        if (!userExist) {
            return res.json({ msg: "User does not exist. Please signup." });
        }

        const match = await bcryptjs.compare(password, userExist.password);
        if (!match) {
            return res.json({ msg: "Incorrect password" });
        }

        const otp = generateOtp();
        const expiresAt = Date.now() + 5 * 60 * 1000;
        otpStore.set(identifier, { otp, expiresAt });

        if (email) {
            await transporter.sendMail({
                from: "your-email@gmail.com",
                to: email,
                subject: "Your OTP Code",
                text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
            });
        } else {
            await client.messages.create({
                body: `Your OTP is ${otp}. It is valid for 5 minutes.`,
                from: process.env.WHATSAPP,
                to: `+91${phone}`,
            });
        }

        return res.json({ msg: "OTP sent successfully", identifier });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error sending OTP" });
    }
});

router.post("/verify-otp", async (req, res) => {
    const { identifier, otp } = req.body;

    if (!identifier || !otp) {
        return res.status(400).json({ msg: "Identifier and OTP required" });
    }

    const stored = otpStore.get(identifier);

    if (!stored || stored.otp !== otp) {
        return res.status(401).json({ msg: "Invalid OTP" });
    }

    if (Date.now() > stored.expiresAt) {
        otpStore.delete(identifier);
        return res.status(410).json({ msg: "OTP expired" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const user = await Admin.findOne(emailRegex.test(identifier) ? { email: identifier } : { phone: identifier });
    const payload = { id: user._id, email: user.email, phone: user.phone };
    const token = jwt.sign(payload, "password", { expiresIn: "7d" });

    otpStore.delete(identifier);

    return res.json({ msg: "Login successful", token });
});



module.exports = router