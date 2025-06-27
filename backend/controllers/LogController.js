const LogService = require('../services/LogService');

async function listLogs(req, res, next) {
  try {
    const logs = await LogService.listLogs();
    res.json(logs);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listLogs,
};
