const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const port = 3000


require('./src/config/db')

const userRoute = require('./src/routes/userRoutes')
const postRoute = require('./src/routes/postsRoutes')

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(userRoute)
app.use(postRoute)

app.listen(port , ()=>console.log('App is listening at ->'+port))