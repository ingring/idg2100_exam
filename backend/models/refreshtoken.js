const mongoose = require('mongoose');

//Schema for refreshtoken
const refreshTokenSchema = new mongoose.Schema({
  user: String,
  token: String,
});

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = RefreshToken;