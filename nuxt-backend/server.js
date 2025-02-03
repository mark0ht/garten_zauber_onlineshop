/* const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();
 */
const app = express();
app.use(express.json());
app.use(cors()); 

// fake dummy database will be replaced with SQL database in the future I hope so
const users = [];
const JWT_SECRET = process.env.JWT_SECRET || "my_secret_key";

// email transpoter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Register a new user
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // find if user already exist//
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // stores the hashed password
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });

  res.json({ message: "User registered successfully" });
});

// requesting the pw reset
app.post("/request-reset", async (req, res) => {
  const { email } = req.body;

  // Find user
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // this generates a passowrd reset token that expires in 15 minuts
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "15m" });
  user.resetToken = token;

  // link is send via email
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  // / sends the email with the reset link
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    text: `Click here to reset your password: ${resetLink}`,
  });

  console.log(`Reset Link: ${resetLink}`); // this is for testing purposes mainly

  res.json({ message: "Reset link sent to your email" });
});

// token resets the password 
app.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // verifies token
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find((u) => u.email === decoded.email);

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    // hashes the passwrd and upda
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null; // Invalidate the token after use

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
});
// remebers passwords if a user logged in
app.post("/remember-me", async (req, res) => {
  const { rememberToken } = req.body;
  try {
    const decoded = jwt.verify(rememberToken, JWT_REMEMBER_SECRET);
    res.json({ email: decoded.email });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

// Startin the server
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
