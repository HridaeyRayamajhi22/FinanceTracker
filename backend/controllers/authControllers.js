const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

// Generate JWT web token'
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register Users
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;


// Validation: Check for missing fields
if (!fullName || !email || !password) {
  return res.status(400).json({ message: "All fields are mandatory" });
}

try {
  // Check if the email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email address is already in use" });
  }

  // Create the User
  const user = await User.create({
    fullName,
    email,
    password,
    profileImageUrl,
  });

  res.status(201).json({
    id: user._id,
    user,
    token: generateToken(user._id),
  });
} catch (err) {
  res
    .status(500)
    .json({ message: "Error registering user", error: err.message });
}
}

// Login Users
exports.loginUser = async (req, res) => {};

exports.getUserInfo = async (req, res) => {};
