const LogService = require('../services/LogService');

function logAction({ type, module }) {
  console.log(type, module)
  return async (req, res, next) => {
    res.on('finish', async () => {
        console.log(req.user)
        try {
          const userId = req.user?.id;
          if (!userId) return;

          await LogService.createLog({ user_id: userId, type, module });
        } catch (error) {
          console.error('Erro ao criar log:', error);
        }
    });

    next();
  };
}

module.exports = logAction;
