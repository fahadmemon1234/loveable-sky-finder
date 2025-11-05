import db from "../config/db.js";

export const getAirports = async () => {
  const query = "SELECT * FROM airports ORDER BY created_at DESC";
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        console.error("DB Error:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};