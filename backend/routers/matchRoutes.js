const express = require("express");
const router = express.Router();

const authenticateToken = require("../functions/verifyJWT");
const authAdmin = require("../functions/authAdmin");

//controllers
const {
  getMatches,
  getPlayerMatch,
  countMatches,
  createNewMatch,
  getOneMatch,
  deleteMatch,
  updateMatch,
} = require("../controllers/matchcontroller");

//All -- get all matches
router.get("/", authenticateToken, getMatches);

//All -- count all matches
router.get("/count", countMatches);

//User -- create a new match
router.post("/new", authenticateToken, createNewMatch);

//User --  get matches played by user
router.get("/:name", authenticateToken, getPlayerMatch);

//User -- get one match
router.get("/match/:nr", authenticateToken, getOneMatch);

//Admin -- delete a match and update the player score
router.delete("/:matchId", authenticateToken, authAdmin, deleteMatch);

//Admin -- update a match
router.put("/:matchId", authenticateToken, authAdmin, updateMatch);

module.exports = router;
