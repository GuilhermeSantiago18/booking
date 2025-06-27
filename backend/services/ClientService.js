const User = require('../models/User');

async function getAll() {
  return await User.findAll({
    where: { role: 'client' },
    attributes: { exclude: ['password'] }, 
  });
}

module.exports = {
  getAll,
};
