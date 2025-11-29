// const express = require('express');
// const router = express.Router();
// const { getUsers, createUser } = require('../controllers/usersController');

// router.get('/', getUsers);
// router.post('/', createUser);

// // مشابه PUT و DELETE
// module.exports = router;


import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/usersController.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
