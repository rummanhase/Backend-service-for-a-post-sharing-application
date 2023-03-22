const express = require('express')
const app = express()
const port = 3001

require('./src/config/db')

const myRoute = require('./src/routes/userRoutes')

app.use(express.json())
app.use(myRoute)

app.listen(port , ()=>console.log('App is listening at ->'+port))