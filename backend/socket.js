const { Server } = require("socket.io");
const bcrypt = require("bcrypt");
const { Player } = require("./models/player");
const Match = require("./models/match");

let roomData = [];
let validation = [];

let game = {
  player1: {
    name: "player1",
    points: 0,
    sets: 0,
  },
  player2: {
    name: "player2",
    points: 0,
    sets: 0,
  },
  sets: "",
};

const connectedUsers = new Map();

function configureSocket(server) {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {

    socket.on("join-room", (room, user, cb) => {
      const roomExists = io.sockets.adapter.rooms.has(room);
      if (!roomExists) {
        return cb(false);
      }
      socket.join(room);
      roomData[room].player2.name = user;
      roomData[room].state = true;
      cb(room);
      io.to(room).emit("players", roomData[room]);
    });

    socket.on("host-room", (room, cb) => {
      console.log(`User ${room} is hosting the match`);
      socket.join(room);
      const newGame = {
        player1: {
          name: room,
          points: 0,
          sets: 0,
        },
        player2: {
          name: "Waiting for player 2",
          points: 0,
          sets: 0,
        },
        sets: "",
        state: false,
      };

      let gameValidation = {
        player1: {
          password: false,
        },
        player2: {
          password: false,
        },
      };

      // Store the game object in the room-specific data
      roomData[room] = newGame;
      validation[room] = gameValidation;
      cb(room);
      io.to(room).emit("players", roomData[room]);
    });

    socket.on("point", (user, room) => {
      if (!roomData[room].state) return;
      if (user == roomData[room].player1.name) {
        roomData[room].player1.points += 1;
        if (roomData[room].player1.points > 10) {
          checkWin(room);
        }
      } else if (user == roomData[room].player2.name) {
        roomData[room].player2.points += 1;
        if (roomData[room].player2.points > 10) {
          checkWin(room);
        }
      }

      io.to(room).emit("players", roomData[room]);
    });

    socket.on("send-password", async (user, input, room, cb) => {
      try {
        const player = await Player.findOne({ username: user });
        if (!player) {
          return cb(false);
        }
        const validPassword = await bcrypt.compare(input, player.password);
        if (!validPassword) {
          return cb(false);
        }
        if (user == roomData[room].player1.name) {
          validation[room].player1.password = input;
        } else {
          validation[room].player2.password = input;
        }
        io.to(room).emit("confirmed", user);
        cb(true);

        if (
          validation[room].player1.password &&
          validation[room].player2.password
        ) {
          let createMatchStatus = await createNewMatch(roomData[room]);
          io.to(room).emit("match-status", createMatchStatus);
        }
      } catch (err) {
        console.log(err);
        cb(false);
      }
    });

    function checkWin(room) {
      //if the score is not equal
      if (roomData[room].player1.points !== roomData[room].player2.points) {
        //send to verifySet to see is the set is over, sending it with the leaders as the first arguement, and other player as the 2nd
        if (roomData[room].player1.points > roomData[room].player2.points) {
          verifySet(roomData[room].player1, roomData[room].player2, room);
        } else verifySet(roomData[room].player2, roomData[room].player1, room);
      } 
    }

    function verifySet(leader, behind, room) {
      //check if the set is over
      if (leader.points >= behind.points + 2) leader.sets++;
      else return;

      //adding the finished points to the gamesets
      roomData[
        room
      ].sets += `(${roomData[room].player1.points} - ${roomData[room].player2.points})`;

      //resetting the score counter
      leader.points = 0;
      behind.points = 0;

      //check if the game is over - and if so - assigning medal
      if (leader.sets >= 3) {
        //sending the game - and stopping the counters
        //this.sendGame();
        roomData[room].state = false;
        io.to(room).emit("game over");
      }
    }
  });

  io.use((socket, next) => {
    if (game.player1.name != "player1" && game.player2.name != "player2") {
      return next(new Error("connection refused, too many players"));
    }

    return next();
  });
}

//post a new match from webcomponent
const createNewMatch = async (game) => {
  try {
    const result = game.sets;
    let player1Username = game.player1.name;
    let player2Username = game.player2.name;

    // // Extract scores using regular expressions
    const regex = /(\d+) - (\d+)/g;
    const matches = result.match(regex);

    // // Initialize variables for player scores
    let scorePlayer1 = 0;
    let scorePlayer2 = 0;

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

    //check if player 1 exists in the database and (if so) saving player1 as the document
    var player1 = await Player.findOne({ username: player1Username });

    //check if player 2 exists in the database and (if so) saving player1 as the document
    var player2 = await Player.findOne({ username: player2Username });

    //check if the match score is valid
    const status = checkMatchScore(scorePlayer1, scorePlayer2);
    if (status === 1) {
      //if player 1 wins
      player1.points += 3;
      player1.wins += 1;
      winner = player1.username;
    } else if (status === 2) {
      //if player 2 wins
      player2.points += 3;
      player2.wins += 1;
      winner = player2.username;
    } else {
      //if the match score is invalid - return the error message
      return "The score is invalid";
    }

    // //increase the matches played by 1 to the documents
    player1.games += 1;
    player2.games += 1;
    //save the players(users) to the database
    player1.save();
    player2.save();

    // //create a new match, and store it in the database
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
    var newestMatch = await Match.findOne().sort({ matchId: -1 }).limit(1);
    if (!newestMatch) {
      match.matchId = 1;
    } else {
      let newMatchId = newestMatch.matchId + 1;
      match.matchId = newMatchId;
    }
    match.save();
    return match.matchId;
  } catch {
    return "An error was made trying to save the match.";
  }

  function checkMatchScore(p1, p2) {
    //no players should have a negative score
    if (p1 < 0 || p2 < 0) return "Matches needs a valid score";
    //Table tennis games can't end in a tie
    if (p1 === p2) return "Match must have a winner";
    //Check if the winning player has a valid score
    if (p1 > p2 && [3, 4, 5, 6, 7].includes(p1)) return 1;
    if (p1 < p2 && [3, 4, 5, 6, 7].includes(p2)) return 2;
    else
      return "Winner must win 3, 4, 5, 6 or 7 sets for the match to be valid";
  }
};

module.exports = {
  configureSocket,
};
