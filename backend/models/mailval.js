const mongoose = require('mongoose');

//Subdocument containing a user with username and MongoDB id
const ValidationSchema = mongoose.Schema({

    user: String,
    token: String

})

const Validation = mongoose.model('Validation', ValidationSchema)
module.exports = Validation