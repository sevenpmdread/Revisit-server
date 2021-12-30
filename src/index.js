const express = require ('express')
const mongoose = require('mongoose');


const app = express()

const mongoUri = 'mongodb+srv://adityatss:incorrect12345@cluster0.9n2bk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoUri)

app.get('/', (req,res) => {
  res.send('Hi there')
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
