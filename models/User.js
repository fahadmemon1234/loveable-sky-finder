import db from "../config/db.js";
import bcrypt from "bcrypt";

const User = {
  // Create new user (hash password and store both)
  create: async (data, callback) => {
    try {
      const { name, email, password, role } = data;
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql =
        "INSERT INTO users (name, email, password, passwordHash, role) VALUES (?, ?, ?, ?, ?)";
      db.query(
        sql,
        [name, email, password, hashedPassword, role || "admin"],
        callback
      );
    } catch (error) {
      console.error("Error hashing password:", error);
      callback(error, null);
    }
  },

  // Get all users (excluding passwords)
  getAll: (callback) => {
    const sql = "SELECT id, name, email, role, created_at FROM users";
    db.query(sql, callback);
  },

  // Get user by ID
  getById: (id, callback) => {
    const sql =
      "SELECT id, name, email, role, created_at FROM users WHERE id = ?";
    db.query(sql, [id], callback);
  },

  // Get users by role
  getByRole: (role, callback) => {
    const sql =
      "SELECT id, name, email, role, created_at FROM users WHERE role = ?";
    db.query(sql, [role], callback);
  },

  // Find user by email (for login)
  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], callback);
  },

  // Verify user password
  verifyPassword: async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
  },

  // Update user
  update: async (id, data, callback) => {
    try {
      const { name, email, password, role } = data;
      let sql, values;

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        sql =
          "UPDATE users SET name = ?, email = ?, password = ?, passwordHash = ?, role = ? WHERE id = ?";
        values = [name, email, password, hashedPassword, role, id];
      } else {
        sql = "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?";
        values = [name, email, role, id];
      }

      db.query(sql, values, callback);
    } catch (error) {
      console.error("Error updating user:", error);
      callback(error, null);
    }
  },

  // Delete user
  delete: (id, callback) => {
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [id], callback);
  },
};

export default User;
