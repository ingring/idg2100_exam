const mongoose = require('mongoose');


// Subdocument containing a user with username and MongoDB id
const PlayerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }
});

// Schema for the match
const MatchSchema = new mongoose.Schema({
    player1: PlayerSchema, // player 1 information
    player2: PlayerSchema, // player 2 information
    matchId: {
        type: Number,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now, // Set default value to current time
        required: true
    },
    scorePlayer1: {
        type: Number,
        required: true
    },
    scorePlayer2: {
        type: Number,
        required: true
    },
    winner: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    }
});



const Match = mongoose.model('Match', MatchSchema);

module.exports = Match;
