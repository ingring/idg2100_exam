//endpoints and functions taken from previous assignments: createNewMatch, checkMatchScore, deleteMatch
const Match = require("../models/match");
const { Player } = require("../models/player");
const bcrypt = require("bcrypt");
const Joi = require("joi");

//get matches
const getMatches = async (req, res) => {
  try {
    const matches = await Match.find().sort({ matchId: -1 });
    res.send(matches);
  } catch (err) {
    res.json({ message: err });
  }
};

//Count the amount of matches
const countMatches = async (req, res) => {
  try {
    const matches = await Match.find().countDocuments();
    res.send({ count: matches });
  } catch (err) {
    res.status(400).json({ message: "error" });
  }
};

//USER -- get one match
const getOneMatch = async (req, res) => {

  //setting user and match id
  let userRole = req.user.role;
  let username = req.user.username;
  let matchId = req.params.nr;


  //check if the user has an appropriate role
  if (userRole !== "User" && userRole !== "Admin") {
    return res
      .status(403)
      .send("Please confirm your email in order to play matches");
  }

  try {
    let match = await Match.findOne({ matchId });
    if (userRole === "User") {
      if (
        username !== match.player1.username &&
        username !== match.player2.username
      ) {
        return res
          .status(403)
          .send(
            "You are not in this match. You can only view matches you played"
          );
      }
    }
    return res.send(match);
  } catch (err) {
    console.log(err);
    return res.status(400).send("This match does not exist. Start a new match");
  }
};

//post a new match from webcomponent
const createNewMatch = async (req, res) => {
  let admin = false;
  if (req.user.role === "Admin") admin = true;


  const { error } = validateCreateMatch(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const result = req.body.result;
  let player1Username = req.body.player1;
  let player2Username = req.body.player2;
  let player1Password = req.body.p1Password;
  let player2Password = req.body.p2Password;

  // Initialize variables for player scores
  let scorePlayer1 = 0;
  let scorePlayer2 = 0;
  try {
    //Validate passwords
    // Extract scores using regular expressions
    const regex = /(\d+) - (\d+)/g;
    const matches = result.match(regex);

    // Calculate scores for each (x - y) set
    for (const match of matches) {
      const scores = match.match(/\d+/g);
      const player1Score = parseInt(scores[0]);
      const player2Score = parseInt(scores[1]);

      if (player1Score > player2Score) {
        scorePlayer1++;
      } else if (player2Score > player1Score) {
        scorePlayer2++;
      }
    }


    let winner;
    //player usernames
    //score of the players

    //check if player 1 exists in the database and (if so) saving player1 as the document
    var player1 = await Player.findOne({ username: player1Username });
    if (!player1)
      return res.status(400).send(`${player1Username} does not exist`);
    if (!admin) {
      const validPasswordPlayer1 = await bcrypt.compare(
        player1Password,
        player1.password
      );
      if (!validPasswordPlayer1)
        return res.status(403).send(`${player1Username}: Password is wrong.`);
    }
    if(player1.role !== 'User') return res.status(401).send(`${player1.username}: role is ${player1.role}, only verified users can play!`)

    //check if player 2 exists in the database and (if so) saving player1 as the document
    var player2 = await Player.findOne({ username: player2Username });
    if (!player2)
      return res.status(400).send(`${player2Username} does not exist`);

    //player need to validate with password
    if (!admin) {
      const validPasswordPlayer2 = await bcrypt.compare(
        player2Password,
        player2.password
      );
      if (!validPasswordPlayer2)
        return res.status(400).send(`${player2Username}: Password is wrong.`);
    }
    if(player2.role !== 'User') return res.status(401).send(`${player2.username}: role is ${player2.role}, only verified users can play!`)


  } catch (error) {
    //Error code if player1 is not foun
    console.log("err", error);
    return res
      .status(404)
      .send(`Username: "${req.body.player2}" does not exist`);
  }

  //check if the match score is valid
  const status = checkMatchScore(scorePlayer1, scorePlayer2);
  if (status === 1) {
    //if player 1 wins
    player1.points += 3;
    player1.wins += 1;
    player2.points += 1;
    winner = player1.username;
  } else if (status === 2) {
    //if player 2 wins
    player2.points += 3;
    player2.wins += 1;
    player1.points += 1;
    winner = player2.username;
  } else {
    //if the match score is invalid - return the error message
    return res.status(404).send(status);
  }

  //increase the matches played by 1 to the documents
  player1.games += 1;
  player2.games += 1;
  //save the players(users) to the database
  player1.save();
  player2.save();

  //create a new match, and store it in the database
  const match = new Match({
    player1: {
      username: player1.username,
    },
    player2: {
      username: player2.username,
    },
    scorePlayer1,
    scorePlayer2,
    winner,
    result,
  });
  try {
    var newestMatch = await Match.findOne().sort({ matchId: -1 }).limit(1);
    if (!newestMatch) {
      match.matchId = 1;
    } else {
      let newMatchId = newestMatch.matchId + 1;
      match.matchId = newMatchId;
    }
    match.save();
    res.send(match);
  } catch {
    return res.status(404).send("An error was made trying to save the match.");
  }
};

//gets matches that a player is in
const getPlayerMatch = async (req, res) => {
  try {
    const Matchp1 = await Match.find({ "player1.username": req.params.name });
    const Matchp2 = await Match.find({ "player2.username": req.params.name });

    // Combine the matches and sort in descending order
    const matches = [...Matchp1, ...Matchp2];
    matches.sort((a, b) => b.matchId - a.matchId);

    res.send(matches);
  } catch (err) {
    res.json({ message: err });
  }
};

function checkMatchScore(p1, p2) {
  //no players should have a negative score
  if (p1 < 0 || p2 < 0) return "Matches needs a valid score";
  //Table tennis games can't end in a tie
  if (p1 === p2) return "Match must have a winner";
  //Check if the winning player has a valid score
  if (p1 > p2 && [3, 4, 5, 6, 7].includes(p1)) return 1;
  if (p1 < p2 && [3, 4, 5, 6, 7].includes(p2)) return 2;
  else return "Winner must win 3, 4, 5, 6 or 7 sets for the match to be valid";
}

// Deletes a match according to the id
const deleteMatch = async (req, res) => {
  try {
    // Find the information of the specific match
    const findMatch = await Match.findOne({ matchId: req.params.matchId });


    // Check who the winner is and who the loser is
    const winner =
      findMatch.scorePlayer1 > findMatch.scorePlayer2
        ? findMatch.player1.username
        : findMatch.player2.username;
    const loser =
      findMatch.scorePlayer1 < findMatch.scorePlayer2
        ? findMatch.player1.username
        : findMatch.player2.username;

    // update the players score
    const upwinner = await Player.updateOne(
      { username: winner },
      { $inc: { wins: -1, points: -3, games: -1 } }
    );
    const uploser = await Player.updateOne(
      { username: loser },
      { $inc: { points: -1, games: -1 } }
    );

    // Lastly, remove the match
    const removeMatch = await Match.deleteOne({ matchId: req.params.matchId });
    res.json({ message: `Deleted the match` });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//Using Joi to validate the player input
function validateCreateMatch(match) {
  const schema = Joi.object({
    result: Joi.string().required(),
    player1: Joi.string().min(3).max(30).required(),
    player2: Joi.string().min(3).max(30).required(),
    p1Password: Joi.string().min(6).max(30),
    p2Password: Joi.string().min(6).max(30),
  });

  return schema.validate(match);
}

//put a new match from webcomponent
const updateMatch = async (req, res) => {
  const existingMatch = await Match.findOne(
    { matchId: req.params.matchId },
    {}
  );
  if (!existingMatch)
    return res
      .status(400)
      .send(`Could not find selected match ${req.params.matchId}`);

  const result = req.body.result;

  // Initialize variables for player scores
  let scorePlayer1 = 0;
  let scorePlayer2 = 0;

  // Calculate the score
  try {
    // Extract scores using regular expressions
    const regex = /(\d+) - (\d+)/g;
    const matches = result.match(regex);

    // Calculate scores for each (x - y) set
    for (const match of matches) {
      const scores = match.match(/\d+/g);
      const player1Score = parseInt(scores[0]);
      const player2Score = parseInt(scores[1]);

      if (player1Score > player2Score) {
        scorePlayer1++;
      } else if (player2Score > player1Score) {
        scorePlayer2++;
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .send(`Username: "${req.body.player2}" does not exist`);
  }

  let winner;
  let loser;

  //check if the match score is valid
  const status = checkMatchScore(scorePlayer1, scorePlayer2);
  if (status === 1) {
    // If player 1 wins
    winner = existingMatch.player1.username;
    loser = existingMatch.player2.username;
  } else if (status === 2) {
    //if player 2 wins
    winner = existingMatch.player2.username;
    loser = existingMatch.player1.username;
  } else {
    //if the match score is invalid - return the error message
    return res.status(404).send(status);
  }

  const updatedMatch = {
    scorePlayer1: scorePlayer1,
    scorePlayer2: scorePlayer2,
    winner: winner,
    result: result,
  };

  if (updatedMatch.winner !== existingMatch.winner) {
    const upwinner = await Player.updateOne(
      { username: winner },
      { $inc: { wins: 1, points: 2 } }
    );
    const uploser = await Player.updateOne(
      { username: loser },
      { $inc: { wins: -1, points: -2 } }
    );
  }

  try {
    const updated = await Match.findOneAndUpdate(
      { matchId: req.params.matchId },
      updatedMatch,
      { new: true }
    );
    res.send(updated);
  } catch {
    return res.status(404).send("An error was made trying to save the match.");
  }
};

module.exports = {
  getMatches,
  getPlayerMatch,
  countMatches,
  createNewMatch,
  getOneMatch,
  deleteMatch,
  updateMatch,
};
