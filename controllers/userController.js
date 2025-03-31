const User = require('../models/User');

// @desc    Get all users
// @route   GET /users
// @access  Protected (admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user by ID
// @route   GET /users/:id
// @access  Protected
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new user (used internally, not for signup)
// @route   POST /users
// @access  Protected (admin)
exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const user = await User.create({ name, email, phone, password, role });
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user by ID
// @route   PUT /users/:id
// @access  Protected
exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;

    // Prevent password update this way
    if (updates.password) delete updates.password;

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User updated', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user by ID
// @route   DELETE /users/:id
// @access  Protected
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
