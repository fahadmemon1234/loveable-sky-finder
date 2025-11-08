// import bcrypt from "bcrypt";
// import db from "../config/db.js";

// const User = {
//   // ✅ Create new user
//   create: async ({ name, email, password, role = "admin" }) => {
//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const pool = await db();

//       await pool
//         .request()
//         .input("name", name)
//         .input("email", email)
//         .input("password", password)
//         .input("passwordHash", hashedPassword)
//         .input("role", role)
//         .query(
//           "INSERT INTO users (name, email, password, passwordHash, role) VALUES (@name, @email, @password, @passwordHash, @role)"
//         );

//       return { message: "User created successfully" };
//     } catch (error) {
//       console.error("Error creating user:", error);
//       throw error;
//     }
//   },

//   // ✅ Find user by email (for login)
//   findByEmail: async (email) => {
//     try {
//       const pool = await db();
//       const result = await pool
//         .request()
//         .input("email", email)
//         .query("SELECT * FROM users WHERE email = @email");
//       return result.recordset[0];
//     } catch (error) {
//       console.error("Error finding user by email:", error);
//       throw error;
//     }
//   },

//   // ✅ Verify password
//   verifyPassword: async (inputPassword, hashedPassword) => {
//     return await bcrypt.compare(inputPassword, hashedPassword);
//   },

//   // ✅ Get all users
//   getAll: async () => {
//     try {
//       const pool = await db();
//       const result = await pool
//         .request()
//         .query("SELECT id, name, email, role, created_at FROM users");
//       return result.recordset;
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       throw error;
//     }
//   },

//   // ✅ Get user by ID
//   getById: async (id) => {
//     try {
//       const pool = await db();
//       const result = await pool
//         .request()
//         .input("id", id)
//         .query("SELECT id, name, email, role, created_at FROM users WHERE id = @id");
//       return result.recordset[0];
//     } catch (error) {
//       console.error("Error fetching user by ID:", error);
//       throw error;
//     }
//   },

//   // ✅ Get users by role
//   getByRole: async (role) => {
//     try {
//       const pool = await db();
//       const result = await pool
//         .request()
//         .input("role", role)
//         .query("SELECT id, name, email, role, created_at FROM users WHERE role = @role");
//       return result.recordset;
//     } catch (error) {
//       console.error("Error fetching users by role:", error);
//       throw error;
//     }
//   },

//   // ✅ Update user
//   update: async (id, { name, email, password, role }) => {
//     try {
//       const pool = await db();

//       if (password) {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         await pool
//           .request()
//           .input("id", id)
//           .input("name", name)
//           .input("email", email)
//           .input("password", password)
//           .input("passwordHash", hashedPassword)
//           .input("role", role)
//           .query(
//             "UPDATE users SET name=@name, email=@email, password=@password, passwordHash=@passwordHash, role=@role WHERE id=@id"
//           );
//       } else {
//         await pool
//           .request()
//           .input("id", id)
//           .input("name", name)
//           .input("email", email)
//           .input("role", role)
//           .query("UPDATE users SET name=@name, email=@email, role=@role WHERE id=@id");
//       }

//       return { message: "User updated successfully" };
//     } catch (error) {
//       console.error("Error updating user:", error);
//       throw error;
//     }
//   },

//   // ✅ Delete user
//   delete: async (id) => {
//     try {
//       const pool = await db();
//       await pool.request().input("id", id).query("DELETE FROM users WHERE id=@id");
//       return { message: "User deleted successfully" };
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       throw error;
//     }
//   },
// };

// export default User;


// models/User.js
import bcrypt from "bcrypt";
import db from "../config/db.js";

const User = {
  // ✅ Create new user
  create: async ({ name, email, password, role = "admin" }) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const pool = await db();

      await pool.query(
        "INSERT INTO users (name, email, password, passwordHash, role) VALUES (?, ?, ?, ?, ?)",
        [name, email, password, hashedPassword, role]
      );

      return { message: "User created successfully" };
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  // ✅ Find user by email
  findByEmail: async (email) => {
    try {
      const pool = await db();
      const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
      return rows[0];
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw error;
    }
  },

  // ✅ Verify password
  verifyPassword: async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
  },

  // ✅ Get all users
  getAll: async () => {
    try {
      const pool = await db();
      const [rows] = await pool.query(
        "SELECT id, name, email, role, created_at FROM users"
      );
      return rows;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  // ✅ Get user by ID
  getById: async (id) => {
    try {
      const pool = await db();
      const [rows] = await pool.query(
        "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  },

  // ✅ Get users by role
  getByRole: async (role) => {
    try {
      const pool = await db();
      const [rows] = await pool.query(
        "SELECT id, name, email, role, created_at FROM users WHERE role = ?",
        [role]
      );
      return rows;
    } catch (error) {
      console.error("Error fetching users by role:", error);
      throw error;
    }
  },

  // ✅ Update user
  update: async (id, { name, email, password, role }) => {
    try {
      const pool = await db();

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
          "UPDATE users SET name=?, email=?, password=?, passwordHash=?, role=? WHERE id=?",
          [name, email, password, hashedPassword, role, id]
        );
      } else {
        await pool.query(
          "UPDATE users SET name=?, email=?, role=? WHERE id=?",
          [name, email, role, id]
        );
      }

      return { message: "User updated successfully" };
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  // ✅ Delete user
  delete: async (id) => {
    try {
      const pool = await db();
      await pool.query("DELETE FROM users WHERE id=?", [id]);
      return { message: "User deleted successfully" };
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
};

export default User;
