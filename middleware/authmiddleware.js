const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
async function authmiddleware(req, res, next) {
  const authheader = req.headers.authorization;

  if (!authheader || !authheader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication Invalid for the case not known" });
  }

  const token = authheader.split(" ")[1];
  //   console.log(authheader);
  //   console.log(token);

  try {
    const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { username, userid };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authorization Invalid sy" });
  }
}

module.exports = authmiddleware;
