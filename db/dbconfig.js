const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false, // Required for Supabase SSL
  },
});

console.log("Database connected successfully");
module.exports = pool;
