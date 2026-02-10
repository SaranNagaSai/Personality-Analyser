const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/User");
const TestResult = require("./models/TestResult");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// REGISTER
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    const user = new User({ name, phone, password });
    await user.save();

    res.json({
      msg: "Registration successful",
      userId: user._id,
      name: user.name
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ msg: "Server error during registration" });
  }
});

// LOGIN
app.post("/api/auth/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    // Find user
    const user = await User.findOne({ name, password });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    res.json({
      name: user.name,
      userId: user._id
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Server error during login" });
  }
});

// SUBMIT TEST
app.post("/api/test/submit", async (req, res) => {
  try {
    const { scores, userName, userId } = req.body;

    if (!scores || !userName) {
      return res.status(400).json({ msg: "Scores and userName are required" });
    }

    // Determine personality type based on scores
    const personality = scores.social > 2 ? "Extrovert Thinker" : "Calm Analyzer";

    // Create test result
    const testResult = new TestResult({
      user: userId || null,
      userName,
      scores,
      personality
    });

    await testResult.save();

    res.json({
      personality,
      resultId: testResult._id
    });
  } catch (error) {
    console.error("Test submission error:", error);
    res.status(500).json({ msg: "Server error during test submission" });
  }
});

// SIMILAR PERSONALITY COUNT
app.get("/api/test/similar/:type", async (req, res) => {
  try {
    const count = await TestResult.countDocuments({
      personality: req.params.type
    });

    res.json({ count });
  } catch (error) {
    console.error("Similar count error:", error);
    res.status(500).json({ msg: "Server error", count: 0 });
  }
});

// GET USER'S TEST HISTORY
app.get("/api/test/history/:userId", async (req, res) => {
  try {
    const results = await TestResult.find({ user: req.params.userId })
      .sort({ createdAt: -1 });

    res.json({ results });
  } catch (error) {
    console.error("History error:", error);
    res.status(500).json({ msg: "Server error", results: [] });
  }
});

// GET ALL PERSONALITY STATISTICS
app.get("/api/test/stats", async (req, res) => {
  try {
    const totalTests = await TestResult.countDocuments();
    const extroverts = await TestResult.countDocuments({ personality: "Extrovert Thinker" });
    const calmAnalyzers = await TestResult.countDocuments({ personality: "Calm Analyzer" });

    res.json({
      totalTests,
      extroverts,
      calmAnalyzers
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running with MongoDB on port ${PORT}`);
});
