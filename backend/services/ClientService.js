const User = require('../models/User');

async function getAll() {
  return await User.findAll({
    where: { role: 'client' },
    attributes: { exclude: ['password'] }, 
  });
}


async function updateClient(id, data) {
  const user = await User.findByPk(id);
  if (!user) {
    throw new CustomError('Usuário não encontrado', 404);
  }

  if (data.canSchedule !== undefined) user.canSchedule = data.canSchedule;
  if (data.canViewLogs !== undefined) user.canViewLogs = data.canViewLogs;
  if (data.status !== undefined) user.status = data.status;

  await user.save();
  return user;
}

module.exports = {
  getAll,
  updateClient
};
