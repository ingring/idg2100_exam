//this controller is an altered vertion of a guide: https://www.youtube.com/watch?v=27KeYk-5vJw 
//we have made some modification to it, for example useing mongodb, and finding the token another way
const RefreshToken = require("../models/refreshtoken");

//modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

async function handleRefreshToken(req, res) {
  try {
    const tokens = req.rawHeaders.filter((s) => s.includes("NTNU"))[0];
    const arrayTokens = tokens.split(" ");
    refreshTokenWithPrefix = arrayTokens.filter((s) => s.includes("NTNU"))[0];
    let refreshToken = refreshTokenWithPrefix.split("=")[1];

    //find the refreshtoken on db
    const foundToken = await RefreshToken.findOne({ token: refreshToken });
    if (!foundToken) return res.status(403).send("not found"); //forbidden

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundToken.user !== decoded.username)
          return res.status(403).send("forbidden");
        const accessToken = jwt.sign(
          { role: decoded.role, username: decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
        res.send({
          accesstoken: accessToken,
          username: decoded.username,
          role: decoded.role,
        });
      }
    );
  } catch {
    res.status(403).send(); //forbidden
  }
}

module.exports = handleRefreshToken;
