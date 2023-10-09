const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

//function to verify user
function authenticateToken(req, res, next) {
  //finding the token
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  //checking if the token is valid, if yes --> continue
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //return error(403) if not valid
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
