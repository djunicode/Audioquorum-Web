const express = require('express')
const User = require('../models/User')
const router = new express.Router()
const auth = require('../middleware/auth') 
const {

  loginUser,
  logoutUser

} = require('../controllers/user')

//Login User - Public
router.post('/login', loginUser )

//Logout User - Public
router.post('/logout', logoutUser)