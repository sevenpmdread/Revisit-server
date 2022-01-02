require('./models/User')
require('./models/Track')
const express = require ('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middleware/requireAuth')

const app = express()

app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)


const mongoUri = 'mongodb+srv://adityatss:incorrect12345@cluster0.9n2bk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoUri)

app.get('/',requireAuth, (req,res) => {
  res.send(`Your email is ${req.user.email} `)
})

mongoose.connection.on('connected', () =>{
    console.log('connnected to mongo')
})

mongoose.connection.on('error', (e) =>{
    console.error('error while connecting to mongo',e)
})

app.listen(3000, ()=> {
  console.log('Listening')
})
