const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')
const router = express.Router();


 router.post('/signup', async (req,res)=> {
   //req.body has the email and password
   const {email, password } = req.body
   try {const user = new User({email,password})
   await user.save()
   const token = jwt.sign({userid: user._id},'MY_SECRET_KEY')
   res.send({token})
  }
  catch(error){
    return res.status(422).send(error.message)
  }
 })

 router.post('/signin', async (req,res)=>{
   const {email,password} = req.body;

   if(!email || !password)
   return res.status(422).send({error:'Error mus provide email and password'})

  const user =  await User.findOne({email})
  if(!user)
  return res.status(422).send({error:'Email not found'})

  try
  {
    await user.comparePassword(password)
    const token = jwt.sign({userId:user._Id},'MY_SECRET_KEY')
    res.send({token})
  }
  catch(error)
  {
    return res.status(422).send({error:'Password do not match'})
  }


 })

 module.exports = router
