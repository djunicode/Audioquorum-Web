// importing modules
const express = require('express');
const {
    createUser,
    viewUser,
    viewAllUsers,
    updateUser,
    deleteUser
} = require('../controllers/admin');

const router = new express.Router();

router.post('/user/create', createUser);
router.get('/user/view/', viewAllUsers);
router.get('/user/viewAll', viewAllUsers);
router.put('/user/update', updateUser);
router.delete('/user/delete', deleteUser);

// Exporting Modules
module.exports = router;