const pool = require("../config/db"); 

async function testConnection() {
  try {
    const [results] = await pool.query("SELECT 1 + 1 AS solution");
    console.log("Connected to database. The solution is:", results[0].solution);
  } catch (err) {
    console.error("Database connection failed:", err.stack);
  } finally {
    pool.end(); 
  }
}

testConnection();
