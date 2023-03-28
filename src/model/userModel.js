const mongoose = require('../packages/exportPackages').mongoose

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String

})

const userModel = new mongoose.model('users' , userSchema)

module.exports = userModel