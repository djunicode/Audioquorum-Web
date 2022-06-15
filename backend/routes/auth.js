const express = require('express');
const auth = require('../middlewares/auth');
const {
  loginUser,
  logoutUser
} = require('../controllers/auth');

// Initializing router
const router = new express.Router();

//Login User - Public
router.post('/login', loginUser )

//Logout User - Public
router.post('/logout', auth.verifyjwt, logoutUser)

// Exporting Modules
module.exports = router;