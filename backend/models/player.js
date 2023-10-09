const mongoose = require('mongoose');
const Joi = require('joi');

//defining player schema
const Player = mongoose.model('Player', new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String
    },
    surname: {
        type: String
    },
    department: {
        type: String
    },
    //points, wins and games are all set to 0 as the player is created.
    points: {
        type: Number,
        default: 0
    },
    wins: {
        type: Number,
        default: 0
    },
    games: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: ['Unverified', 'User', 'Admin'],
        default: 'Unverified'
    },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]

}));

//Using Joi to validate the player input
function validatePlayer(player) {
    const schema = Joi.object({
        //Joi will check if the entered email is a valid email
        email: Joi.string().email().required(),
        username: Joi.string().min(3).max(30).required(),
        firstName: Joi.string().min(2).max(50),
        surname: Joi.string().min(2).max(50),
        department: Joi.string().min(5).max(80),
        password:Joi.string().min(6).max(30).required()
    });

    return schema.validate(player);
}

//Using Joi to validate the updated player
function validateUpdate(player) {
    const schema = Joi.object({
        //Joi will check if the entered email is a valid email
        email: Joi.string().email(),
        role: Joi.string().valid('Unverified','User','Admin'),
        username: Joi.string().min(3).max(30),
        firstName: Joi.string().min(2).max(50),
        surname: Joi.string().min(2).max(50),
        department: Joi.string().min(5).max(80),
    });

    return schema.validate(player);
}


module.exports.Player = Player;
module.exports.validate = validatePlayer;
module.exports.validateUpdate = validateUpdate;