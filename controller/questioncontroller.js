const pool = require("../db/dbconfig");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");

async function insertquest(req, res) {
  const questionid = uuidv4();
  const { title, description, userid, tag } = req.body;

  if (!title || !description || !userid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required information!" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO questions( questionid, userid, title, description, tag ) VALUES ($1,$2,$3,$4,$5)",
      [questionid, userid, title, description, tag]
    );

    res
      .status(StatusCodes.CREATED)
      .json({ msg: "question added successfully" });
  } catch (error) {
    console.log("Error in insertquest:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later" });
  }
}

async function bringquest(req, res) {
  try {
    const questions = await pool.query(
      "SELECT id, userid, title, description, questionid FROM questions ORDER BY id DESC"
    );

    res.status(StatusCodes.OK).json(questions.rows);
  } catch (error) {
    console.log("Error in bringquest:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later" });
  }
}

async function getquest(req, res) {
  const questionid = req.params.questionid;

  try {
    const questions = await pool.query(
      "SELECT id, userid, title, tag, description, questionid FROM questions WHERE questionid = $1",
      [questionid]
    );
    res.status(StatusCodes.OK).json(questions.rows[0]);
  } catch (error) {
    console.log("Error in getquest:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later" });
  }
}

module.exports = { insertquest, bringquest, getquest };
