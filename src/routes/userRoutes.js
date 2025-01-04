const express = require('express');
const { getUsers, getUser, createUser, updateUser, updateUserFields, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser)
router.put('/users/:id', updateUser)
router.patch('/users/:id', updateUserFields)
router.delete('/users/:id', deleteUser)

module.exports = router;