const User = require('../models/User');
const { logActionManual } = require('./LogAction');

async function getAll() {
  return await User.findAll({
    where: { role: 'client' },
    attributes: { exclude: ['password'] }, 
  });
}


async function updateClient(id, data, adminId) {
  const user = await User.findByPk(id);
  if (!user) {
    throw new CustomError('Usuário não encontrado', 404);
  }

  if (data.canSchedule !== undefined) {
    user.canSchedule = data.canSchedule;
    await logActionManual({
      user_id: adminId,
      type: 'Alteração de permissão de agendamento',
      module: 'Clientes',
    });
  }

  if (data.canViewLogs !== undefined) {
    user.canViewLogs = data.canViewLogs;
    await logActionManual({
      user_id: adminId,
      type: 'Alteração de permissão de logs',
      module: 'Clientes',
    });
  }

  if (data.status !== undefined) {
    user.status = data.status;
    await logActionManual({
      user_id: adminId,
      type: 'Alteração de status do cliente',
      module: 'Clientes',
    });
  }

  await user.save();
  return user;
}


module.exports = {
  getAll,
  updateClient
};
