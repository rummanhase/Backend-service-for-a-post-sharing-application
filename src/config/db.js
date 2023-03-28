const url = 'mongodb://localhost:27017/Instagram'
const mongoose = require('../packages/exportPackages').mongoose;
// const uri = 'mongodb+srv://<username>:<password>@<cluster-url>/test?retryWrites=true&w=majority';
module.exports =  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
