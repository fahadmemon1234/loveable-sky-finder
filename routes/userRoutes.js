import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import User from "../models/User.js";


const router = express.Router();
router.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET; // add to .env


// ✅ Create a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    User.create({ name, email, password, role }, (err, result) => {
      if (err) {
        console.error("Error creating user:", err);
        return res.status(500).json({
          success: false,
          message: "Error creating user",
          error: err,
        });
      }

      res.status(201).json({
        success: true,
        message: "User created successfully",
        userId: result.insertId,
      });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
});

// ✅ User login
// ✅ User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // find user by email
    User.findByEmail(email, async (err, result) => {
      if (err) {
        console.error("Error finding user:", err);
        return res.status(500).json({
          success: false,
          message: "Database error while finding user",
          error: err,
        });
      }

      if (!result || result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const user = result[0];
      const isMatch = await User.verifyPassword(password, user.passwordHash);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // ✅ Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name, role: user.role },
        JWT_SECRET,
        { expiresIn: "1d" } // token valid for 1 day
      );

      // ✅ Set token in cookies
      res.cookie(".AuthBearer", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // secure only in production
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      // ✅ Send success response
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error,
    });
  }
});



// ✅ Get all users
router.get("/", (req, res) => {
  User.getAll((err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({
        message: "Error fetching users",
        error: err,
      });
    }
    res.status(200).json(results);
  });
});

// ✅ Get users by role (e.g., admin or user)
// ⚠️ Must be before /:id to avoid route conflict
router.get("/role/:role", (req, res) => {
  const { role } = req.params;
  User.getByRole(role, (err, results) => {
    if (err) {
      console.error("Error fetching users by role:", err);
      return res.status(500).json({
        message: "Error fetching users by role",
        error: err,
      });
    }
    res.status(200).json(results);
  });
});

// ✅ Get a single user by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  User.getById(id, (err, result) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({
        message: "Error fetching user",
        error: err,
      });
    }

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result[0]);
  });
});

// ✅ Update user
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  if (!name || !email || !role) {
    return res
      .status(400)
      .json({ message: "Name, email, and role are required" });
  }

  User.update(id, { name, email, password, role }, (err) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({
        message: "Error updating user",
        error: err,
      });
    }

    res.status(200).json({ message: "User updated successfully" });
  });
});

// ✅ Delete user
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  User.delete(id, (err) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({
        message: "Error deleting user",
        error: err,
      });
    }

    res.status(200).json({ message: "User deleted successfully" });
  });
});

export default router;
