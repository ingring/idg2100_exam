const express = require("express");
const router = express.Router();
const authAdmin = require("../functions/authAdmin");

const authenticateToken = require("../functions/verifyJWT");
const {
  getPlayers,
  getLeaderboard,
  createPlayer,
  getOnePlayer,
  deletePlayer,
  getTopPlayers,
  validateUsername,
  updatePlayer,
  login,
  countPlayers,
  sendnewpass,
  validateemail,
  makeFavourite,
  removeFavourite,
  getFavourites,
  updatePassword,
} = require("../controllers/playerController");

//ADMIN -- Get list of all players
router.get("/", authenticateToken, authAdmin, getPlayers);

//USER -- create a new user
router.post("/", createPlayer);

//PLAYER -- get leaderboard
router.get("/leaderboard", authenticateToken, getLeaderboard);

//USER -- get top 5 leaderboard
router.get("/top-players", getTopPlayers);

//ALL -- count players
router.get("/count", countPlayers);



//ADMIN -- Update a player
router.put("/update/:user", authenticateToken, updatePlayer);

//Admin -- Delete a player
router.delete("/delete/:user", authenticateToken, authAdmin, deletePlayer);

//PLAYER -- validate username
router.post("/validate", authenticateToken, validateUsername);

//ALL -- Log in a user
router.post("/login", login);

//USER -- email a new generated password
router.post("/sendnewpass", sendnewpass);

//USER -- validates user email
router.post("/validateemail/:token", validateemail);

//Player -- Read favourites
router.get("/favourites/:username", authenticateToken, getFavourites);

//USER -- add a new favourite player
router.post("/newFav", authenticateToken, makeFavourite);

//USER -- remove a favourite player
router.post("/removeFav", authenticateToken, removeFavourite);

//USER -- update password
router.put("/updatePassword", authenticateToken, updatePassword);

//User -- get user information about one user
router.get("/:username", authenticateToken, getOnePlayer);

module.exports = router;
