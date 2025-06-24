const UserService = require('../services/UserService');

async function register(req, res) {
  try {
    const user = await UserService.registerClient(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { user, token } = await UserService.login({ email, password });
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}


module.exports = {
  register,
  login,
};
