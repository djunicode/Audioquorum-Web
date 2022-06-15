// importing modules
const express = require('express');
const auth = require('../middlewares/auth');
const {
    createUser,
    viewUser,
    viewAllUsers,
    updateUser,
    deleteUser
} = require('../controllers/admin');

// Initializing router
const router = new express.Router();

router.post('/user/create', [auth.verifyjwt, auth.userTypeAdmin], createUser);

router.get('/user/view/', [auth.verifyjwt, auth.userTypeAdmin], viewUser);

router.get('/user/viewAll', [auth.verifyjwt, auth.userTypeAdmin], viewAllUsers);

router.put('/user/update', [auth.verifyjwt, auth.userTypeAdmin], updateUser);

router.delete('/user/delete', [auth.verifyjwt, auth.userTypeAdmin], deleteUser);

// Exporting Modules
module.exports = router;