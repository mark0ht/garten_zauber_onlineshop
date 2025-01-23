const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Dummy database (replace with real database later)
const users = [];
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Email setup (use a real email later)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ 1️⃣ Register User
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (users.find((u) => u.email === email))
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  res.json({ message: "User registered" });
});

// ✅ 2️⃣ Request Password Reset
app.post("/request-reset", async (req, res) => {
  const { email } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "15m" });
  user.resetToken = token;

  const resetLink = `http://localhost:3000/reset-password?token=${token}`;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    text: `Click here to reset your password: ${resetLink}`,
  });

  res.json({ message: "Reset link sent to your email" });
});

// ✅ 3️⃣ Reset Password
app.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find((u) => u.email === decoded.email);
    if (!user) return res.status(400).json({ message: "Invalid token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

app.listen(3001, () => console.log("✅ Server running on http://localhost:3001"));
