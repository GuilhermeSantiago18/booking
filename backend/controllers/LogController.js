const LogService = require('../services/LogService');

async function listLogs(req, res, next) {
  try {
    const { role, id: userId } = req.user;

    let logs;

    if (role === 'admin') {
      logs = await LogService.listLogs();
    } else {
      logs = await LogService.listLogsByUser(userId);
    }

    res.json(logs);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listLogs,
};
