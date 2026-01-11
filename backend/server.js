const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage
let users = [];
let results = [];

// REGISTER (NO OTP)
app.post("/api/auth/register", (req, res) => {
  const { name, phone, password } = req.body;

  if (!name || !phone || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const exists = users.find(u => u.name === name);
  if (exists) {
    return res.status(400).json({ msg: "User already exists" });
  }

  users.push({ name, phone, password });
  res.json({ msg: "Registration successful" });
});

// LOGIN
app.post("/api/auth/login", (req, res) => {
  const { name, password } = req.body;

  const user = users.find(
    u => u.name === name && u.password === password
  );

  if (!user) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  res.json({ name: user.name });
});

// SUBMIT TEST
app.post("/api/test/submit", (req, res) => {
  const { scores } = req.body;

  const personality =
    scores.social > 2 ? "Extrovert Thinker" : "Calm Analyzer";

  results.push({ personality });
  res.json({ personality });
});

// SIMILAR PERSONALITY COUNT
app.get("/api/test/similar/:type", (req, res) => {
  const count = results.filter(
    r => r.personality === req.params.type
  ).length;

  res.json({ count });
});

app.listen(5000, () => {
  console.log("Server running (NO OTP, NO DB) on port 5000");
});
