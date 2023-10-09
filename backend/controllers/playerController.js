//"login" is highly inspired by this guide

const { Player, validate, validateUpdate } = require("../models/player");
const Match = require("../models/match");
const Validation = require("../models/mailval");
const RefreshToken = require("../models/refreshtoken");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const dotenv = require("dotenv").config();

//Admin get players
const getPlayers = async (req, res) => {
  try {
    const showPlayers = await Player.find().select({ password: 0, email: 0 });
    res.json(showPlayers);
  } catch (err) {
    res.json({ message: err });
  }
};

//get leaderboard
const getLeaderboard = async (req, res) => {
  //find the players favourites

  try {
    const player = await Player.findOne({ username: req.user.username }).select(
      { favourites: 1 }
    );
    if (!player)
      return res.status(404).send(`could not find ${req.body.username}.`);
    const playerArray = await Player.find()
      .select({ username: 1, points: 1, wins: 1 })
      .sort({ points: -1, wins: -1 });

    //loop through the players and give the players favourited by the user "favourited:true"
    const updatedPlayerArray = playerArray.map((p) => {
      const isFavourited =
        player.favourites &&
        player.favourites.some(
          (favId) => favId && favId.toString() === p._id.toString()
        );
      return { ...p._doc, favourited: isFavourited };
    });
    //send the updated list with favourite players marked
    res.json(updatedPlayerArray);
  } catch (err) {
    console.log("err", err);
    res.json({ message: err });
  }
};

//ADMIN -- update a player
const updatePlayer = async (req, res) => {
  //validate the input from the user
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    //update the user
    let player = await Player.findOneAndUpdate(
      { _id: req.params.user },
      {
        username: req.body.username,
        surname: req.body.surname,
        firstName: req.body.firstName,
        department: req.body.department,
        email: req.body.email,
      },
      { new: true }
    );
    res.send(player);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err });
  }
};

const updatePassword = async (req, res) => {
  //validate the input from the user
  const player = await Player.findOne({ username: req.body.username });
  if (!player) return res.status(400).send("Bad request");

  const validPassword = await bcrypt.compare(
    req.body.oldpassword,
    player.password
  );
  if (!validPassword) return res.status(400).send("Bad request");

  const salt = await bcrypt.genSalt(10);
  let newPass = await bcrypt.hash(req.body.password, salt);
  try {
    await Player.findOneAndUpdate(
      { username: req.body.username },
      {
        password: newPass,
      }
    );
    res.status(200).send("success");
  } catch (err) {
    res.status(400).send({ err });
  }
};

//count players
const countPlayers = async (req, res) => {
  try {
    const players = await Player.find().countDocuments();
    res.send({ count: players });
  } catch (err) {
    res.json({ message: "test" });
  }
};

//ADMIN -- delete one player
const deletePlayer = async (req, res) => {
  try {
    await Player.findOneAndDelete({ username: req.params.user });
  } catch (err) {
    res.status(400).send({ err });
  }
  try {
    await Match.updateMany(
      {
        "player1.username": req.params.user,
      },
      {
        "player1.username": "Deleted user",
      }
    );
    await Match.updateMany(
      {
        "player2.username": req.params.user,
      },
      {
        "player2.username": "Deleted user",
      }
    );
    res.status(200).send("success");
  } catch (err) {
    res.status(400).send({ err });
  }
};

//USER -- get top players
const getTopPlayers = async (req, res) => {
  try {
    //ranking the players by 1. points, 2 wins
    const showPlayers = await Player.find()
      .select({ username: 1, points: 1, wins: 1 })
      .sort({ points: -1, wins: -1 })
      .limit(5);
    res.json(showPlayers);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//validate if username exists
const validateUsername = async (req, res) => {
  try {
    const player1 = await Player.findOne({ username: req.body.player1 });
    if (player1) {
      if (player1.role !== "User") {
        return res
          .status(403)
          .send(`${req.body.player1}: only verified users can play matches`);
      }
    }
    const player2 = await Player.findOne({ username: req.body.player2 });
    if (player2) {
      if (player2.role !== "User") {
        return res
          .status(403)
          .send(`${req.body.player2}: only verified users can play matches`);
      }
      return res.send(`${player2.username} exists`);
    } else return res.status(404).send(`${req.body.player2} does not exist`);
  } catch {
    res.status(404).send(`${req.body.username} `);
  }
};

//gets one player with a name
const getOnePlayer = async (req, res) => {
  try {
    const onePlayer = await Player.find({ username: req.params.username });
    res.json({ onePlayer });
  } catch (err) {
    res.json({ message: err });
  }
};

//log in a player
const login = async (req, res) => {
  // Check if the user exists
  try {
    //find the user in the database
    const player = await Player.findOne({ username: req.body.username });
    if (!player) return res.status(400).send("Invalid username or password.");

    //compare the provided password with the hashed password in the database
    const validPassword = await bcrypt.compare(
      req.body.password,
      player.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid username or password password.");

    //send a JWT token to the client
    const accessToken = jwt.sign(
      { role: player.role, username: player.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { role: player.role, username: player.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1w" }
    );
    let foundPlayer = false;
    try {
      foundPlayer = await RefreshToken.findOneAndUpdate(
        { player: player.username },
        {
          token: refreshToken,
        }
      );
    } catch {
      return res.status(400).send("Lost connection to database");
    }
    try {
      if (!foundPlayer) {
        let dbToken = new RefreshToken({
          user: player.username,
          token: refreshToken,
        });
        dbToken.save();
      }
    } catch {
      return res.status(500).send("Could not create cookie");
    }
    res.cookie("NTNU_jwt", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.header();
    res.send({ accesstoken: accessToken });
  } catch (ex) {
    console.log(ex);
    res.status(500).send("An error occurred while logging in.");
  }
};

//creating a new player
const createPlayer = async (req, res) => {
  //validate the user input through Joi schema
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //create a new user
  const player = new Player(
    _.pick(req.body, [
      "firstName",
      "surname",
      "username",
      "password",
      "email",
      "department",
    ])
  );
  try {
    const salt = await bcrypt.genSalt(10);

    player.password = await bcrypt.hash(player.password, salt);
    savedPlayer = await player.save();

  } catch (error) {
    //handle error
    const err = Object.keys(error.keyPattern)[0];
    return res.status(409).send(`${err} is already taken`);
  }

  const token = generateRandomString(25);

  try {
    const data = new Validation({
      user: player._id.toString(),
      token: token,
    });
    data.save();
  } catch (err) {
    console.log(err);
  }

  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "ntnuppl@outlook.com",
      pass: "Passord!123",
    },
  });

  const email = player.email;

  const id = player._id.toString();

  const text = ` Go to this link to validate your email: http://localhost:3000/validateemail/${token}`;

  const html = `
    <h1> NTNU ppl </h1>
    <h2> Thanks for joining the ntnu pingpong league! </h2>

    <p> Please click the link below to validate your email, and get access to the wonderful world of pingpong! </p>

    <a href="http://localhost:3000/validateemail/${token}"> CLick here </a>
    
    `;

  var mailOptions = {
    from: "ntnuppl@outlook.com",
    to: email,
    subject: "Email validation",
    text: text,
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent");
    }
  });
  res.status(201).send(`User created: ${player.username}`);
};

const sendnewpass = async (req, res) => {
  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "ntnuppl@outlook.com",
      pass: "Passord!123",
    },
  });

  try {
  const response = await Player.findOne({ username: req.body.username });
  

  const email = response.email;

  let pass = generateRandomString(10);
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(pass, salt);

  await Player.findOneAndUpdate(
    { username: response.username },
    {
      password: password,
    }
  );

  const text = `nytt passord til brukeren ${response.username} er ${pass}`;

  var mailOptions = {
    from: "ntnuppl@outlook.com",
    to: email,
    subject: "New password",
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
      res.status(500).send("An error occured while sending new password");
    } else {
      console.log("Email sent");
    }
  });
  res.send("success");
} catch (error) {
  console.log(error)
}
};

//add another player as a favourite
const makeFavourite = async (req, res) => {
  const newFavourite = await Player.findOne({ username: req.body.username });
  if (!newFavourite)
    return res.status(404).send(`could not find ${req.body.username}.`);

  const player = await Player.findOne({ username: req.user.username });
  if (!player)
    return res.status(404).send(`could not find ${req.user.username}.`);

  const isAlreadyFavourite = player.favourites.includes(newFavourite._id);
  if (isAlreadyFavourite) {
    return res.status(409).send(`${req.body.username} is already favourited`);
  }

  player.favourites.push(newFavourite._id);
  player.save();
  res.send("test");
};

//remove a player as a favourite
const removeFavourite = async (req, res) => {
  try {
    const toRemove = await Player.findOne({ username: req.body.username });
    if (!toRemove)
      return res.status(404).send(`could not find ${req.body.username}.`);

    const player = await Player.findOne({ username: req.user.username });
    if (!player)
      return res.status(404).send(`could not find ${req.user.username}.`);

    const isFavourite = player.favourites.includes(toRemove._id);
    if (!isFavourite) {
      return res.status(409).send(`${req.body.username} is not favourited`);
    }

    // Remove the player from the favorites array
    player.favourites = player.favourites.filter(
      (favId) => !favId.equals(toRemove._id)
    );
    await player.save();

    res.send("Player removed from favorites successfully.");
  } catch (err) {
    console.log("Error: ", err);
    res
      .status(500)
      .send(
        `An error occurred while removing ${req.body.username} from favorites.`
      );
  }
};

const validateemail = async (req, res) => {
  try {
    console.log(req.params.token)
    const user = await Validation.findOne({ token: req.params.token });
    console.log(user)
    if (!user) return res.status(404).send("token not found");

    const updated = await Player.findOneAndUpdate(
      { _id: user.user },
      { role: "User" }
    );
    res.send("success");
  } catch (err) {
    console.error(err);
  }
};

const getFavourites = async (req, res) => {
  try {
    const response = await Player.findOne({
      username: req.params.username,
    }).populate("favourites");
    res.json({ response });
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
};

function generateRandomString(len) {
  const characters =
    "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

module.exports = {
  getPlayers,
  getLeaderboard,
  deletePlayer,
  updatePlayer,
  createPlayer,
  getOnePlayer,
  validateUsername,
  login,
  getTopPlayers,
  countPlayers,
  sendnewpass,
  validateemail,
  makeFavourite,
  removeFavourite,
  getFavourites,
  updatePassword,
};
