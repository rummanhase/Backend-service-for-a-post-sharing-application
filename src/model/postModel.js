const mongoose = require('../packages/exportPackages').mongoose

const postSchema = new mongoose.Schema({
    title:String, 
    body:String,
    image:String
})

const postModel = mongoose.model('posts' , postSchema)

module.exports = postModel