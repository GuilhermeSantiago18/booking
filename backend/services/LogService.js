const Log = require('../models/Logs');
const User = require('../models/User');

async function createLog({ user_id, type, module }) {
  return Log.create({ user_id, type, module });
}

async function listLogs() {
  return await Log.findAll({
    include: {
      model: User,
      as: 'user',
      attributes: ['firstName', 'lastName', 'role'],
    },
    order: [['created_at', 'DESC']],
  });
}


async function listLogsByUser(userId) {
  return Log.findAll({
    where: { user_id: userId },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['firstName', 'lastName', 'role'],
      },
    ],
    order: [['createdAt', 'DESC']],
  });
}


async function deleteLog(logId) {
  const log = await Log.findByPk(logId);
  if (!log) {
    throw new CustomError('Log não encontrado', 404);
  }
  await log.destroy({ where: { id: logId } });
}


module.exports = {
  createLog,
  listLogs,
  listLogsByUser,
  deleteLog
};
