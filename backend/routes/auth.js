const express = require('express');
const {
  loginUser,
  logoutUser
} = require('../controllers/auth');

const router = new express.Router();

//Login User - Public
router.post('/login', loginUser )

//Logout User - Public
router.post('/logout', logoutUser)

// Exporting Modules
module.exports = router;