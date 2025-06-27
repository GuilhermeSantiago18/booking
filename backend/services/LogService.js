const Log = require('../models/Logs');
const User = require('../models/User');

async function createLog({ user_id, type, module }) {
  return await Log.create({ user_id, type, module });
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
        attributes: ['firstName', 'lastName', 'role'],
      },
    ],
    order: [['createdAt', 'DESC']],
  });
}


module.exports = {
  createLog,
  listLogs,
  listLogsByUser
};
