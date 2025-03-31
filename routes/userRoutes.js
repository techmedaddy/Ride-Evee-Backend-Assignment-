const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

// All routes below are protected (require JWT token)

// @route GET /users
router.get('/', protect, getAllUsers);

// @route GET /users/:id
router.get('/:id', protect, getUserById);

// @route POST /users
router.post('/', protect, createUser);

// @route PUT /users/:id
router.put('/:id', protect, updateUser);

// @route DELETE /users/:id
router.delete('/:id', protect, deleteUser);

module.exports = router;
