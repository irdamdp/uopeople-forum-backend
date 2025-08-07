const express = require("express");
const router = express.Router();

const {
  insertquest,
  bringquest,
  getquest,
} = require("../controller/questioncontroller");

router.post("/question", insertquest);
router.get("/home", bringquest);

router.get("/:questionid", getquest);

module.exports = router;
