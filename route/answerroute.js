const express = require("express");
const router = express.Router();

const { postanswer, getanswer } = require("../controller/answercontroller");

router.post("/question", postanswer);
router.get("/question/:questionid", getanswer);

module.exports = router;
