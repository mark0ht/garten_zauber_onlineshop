const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "garten_zauber_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    return;
  }
  console.log("Connected to MySQL database!");
});

const JWT_SECRET = process.env.JWT_SECRET || "my_secret_key";
const JWT_REMEMBER_SECRET = process.env.JWT_REMEMBER_SECRET || "my_remember_secret_key";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Register routes before starting the server
app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = "INSERT INTO users (email, password, username) VALUES (?, ?, ?)";

  db.query(query, [email, hashedPassword, name], (err, result) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.status(200).json({ message: "User registered successfully" });
  });
});

app.post("/login", async (req, res) => {
  console.log("Login route hit! Request body:", req.body);
  const { email, password, rememberMe } = req.body;
  
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ message: "Database query error" });
    }
    if (results.length === 0) {
      console.log("User not found for email:", email);
      return res.status(400).json({ message: "User not found" });
    }

    const user = results[0];
    console.log("User found:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Incorrect password for:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Login successful for:", email);
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    let rememberToken = null;
    if (rememberMe) {
      rememberToken = jwt.sign({ email }, JWT_REMEMBER_SECRET, { expiresIn: "7d" });
    }

    res.json({ token, rememberToken });
  });
});

app.post("/remember-me", async (req, res) => {
  const { rememberToken } = req.body;
  try {
    const decoded = jwt.verify(rememberToken, JWT_REMEMBER_SECRET);
    res.json({ email: decoded.email });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

app.post("/request-reset", async (req, res) => {
  const { email } = req.body;
  
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "15m" });
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Click here to reset your password: ${resetLink}`,
    });

    res.json({ message: "Reset link sent to your email" });
  });
});

app.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const query = "UPDATE users SET password = ? WHERE email = ?";
    db.query(query, [hashedPassword, decoded.email], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error updating password" });
      }
      res.json({ message: "Password reset successful" });
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    res.status(200).json(results);
  });
});

app.get("/dashboard-stats", (req, res) => {
    const stats = {
      users: 0,
      products: 0,
      orders: 0,
    };
  
    db.query("SELECT COUNT(*) AS count FROM users", (err, result) => {
      if (!err) stats.users = result[0].count;
      db.query("SELECT COUNT(*) AS count FROM products", (err, result) => {
        if (!err) stats.products = result[0].count;
        db.query("SELECT COUNT(*) AS count FROM orders", (err, result) => {
          if (!err) stats.orders = result[0].count;
          res.json(stats);
        });
      });
    });
  });


app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

console.log("Available Routes:", app._router.stack.map(r => r.route && r.route.path));

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
