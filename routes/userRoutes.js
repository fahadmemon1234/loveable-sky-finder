import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import User from "../models/User.js";

const router = express.Router();
router.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Register new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const result = await User.create({ name, email, password, role });
    res.status(201).json({ success: true, message: result.message });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating user", error });
  }
});

// ✅ Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    const user = await User.findByEmail(email);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await User.verifyPassword(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // res.cookie(".AuthBearer", token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "none",
    //   maxAge: 60 * 60 * 1000,
    // });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error during login", error });
  }
});

// ✅ Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// ✅ Get users by role
router.get("/role/:role", async (req, res) => {
  try {
    const users = await User.getByRole(req.params.role);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users by role", error });
  }
});

// ✅ Get single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

// ✅ Update user
router.put("/:id", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !role) return res.status(400).json({ message: "Name, email, and role required" });

    const result = await User.update(req.params.id, { name, email, password, role });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

// ✅ Delete user
router.delete("/:id", async (req, res) => {
  try {
    const result = await User.delete(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

export default router;
