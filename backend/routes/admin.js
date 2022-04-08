// importing modules
const express = require('express');
const {
    createUser,
    viewAllUsers,
    updateUser,
    deleteUser
} = require('../controllers/admin');

const router = new express.Router();

router.post('/create', createUser);
router.get('/view', viewAllUsers);
router.put('/update', updateUser);
router.delete('/delete', deleteUser);

// Exporting Modules
module.exports = router;