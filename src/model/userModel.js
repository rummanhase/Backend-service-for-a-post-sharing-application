const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : String,
    mail : String,
    pass : String

})

const userModel = new mongoose.model('users' , userSchema)

module.exports = userModel