const express = require('express')
//const User = require('../models/User')
const router = new express.Router()
const auth = require('../middlewares/auth') 
const {

  loginUser,
  logoutUser

} = require('../controllers/auth')

//Login User - Public
router.post('/login', loginUser )

//Logout User - Public
router.post('/logout', logoutUser)

// Exporting Modules
module.exports = router;