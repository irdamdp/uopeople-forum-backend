const pool = require("../db/dbconfig");
const { StatusCodes } = require("http-status-codes");

async function getanswer(req, res) {
  const questionid = req.params.questionid;
  try {
    const answers = await pool.query(
      "SELECT answerid, userid, answer, questionid FROM answer WHERE questionid = $1 ORDER BY answerid DESC",
      [questionid]
    );
    res.status(StatusCodes.OK).json(answers.rows);
  } catch (error) {
    console.log("Error in getanswer:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later" });
  }
}

async function postanswer(req, res) {
  const { answer, questionid, userid } = req.body;
  if (!answer || !questionid || !userid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required information!" });
  }
  try {
    const result = await pool.query(
      "INSERT INTO answer( answer, questionid, userid ) VALUES ($1,$2,$3)",
      [answer, questionid, userid]
    );
    res.status(StatusCodes.OK).json({ msg: "answer added successfully" });
  } catch (error) {
    console.log("Error in postanswer:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later" });
  }
}
module.exports = { postanswer, getanswer };
