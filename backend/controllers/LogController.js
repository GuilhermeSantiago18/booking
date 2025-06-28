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


async function deleteLog(req, res, next) {
  try {
;

   const deleteLog = await LogService.deleteLog(req.params.id);
    res.json(deleteLog);
  } catch (error) {
    next(error);
  }
}


async function createLog(req, res, next) {
  try {
    const {type, module} = req.body
    const {id} = req.user
    console.log("id,", id)
   const logCreated = await LogService.createLog({user_id: id, type, module });
    res.json(logCreated);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  deleteLog,
  listLogs,
  createLog
};
