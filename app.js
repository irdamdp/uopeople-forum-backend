require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5500;
require("dotenv").config();

// const jwt = require("jsonwebtoken");

// // Now process.env.JWT_SECRET is available
// console.log("JWT_SECRET:", process.env.JWT_SECRET);

// db connection
const pool = require("./db/dbconfig.js");
app.use(cors());
app.use(express.json());

// authentication middleware

const authmiddleware = require("./middleware/authmiddleware");

// use router middleware file

const userroutes = require("./route/userroute");
const questionroutes = require("./route/questionroute");
const answerroutes = require("./route/answerroute");

// user middleware routes

app.use("/api/users", userroutes);

// question routes middleware
app.use("/api/questions", authmiddleware, questionroutes);
// answer routes middleware
app.use("/api/answer", authmiddleware, answerroutes);

async function start() {
  try {
    const result = await pool.query(
      "SELECT 'test connection to pg' As message"
    );
    console.log("PostgreSQL DB Connection Successful:", result.rows[0].message); // Just to confirm DB is connected

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to DB:", error);
  }
}

start();
