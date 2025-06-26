const UserService = require('../services/UserService');

async function register(req, res, next) {
  try {
    const user = await UserService.registerClient(req.body);
    res.status(201).json({ user, message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const { user, token } = await UserService.login({ email, password });
    res.status(200).json({ user, token, message: 'Success' });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const userId = req.user.id;
    const updatedUser = await UserService.update(userId, req.body);
    res.status(200).json({ user: updatedUser, message: 'User updated successfully' });
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const userId = req.user.id;
    const user = await UserService.getUserByID(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  updateUser,
  getUser
};
