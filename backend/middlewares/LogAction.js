const LogService = require('../services/LogService');

function logAction({ type, module }) {
  return async (req, res, next) => {
    res.on('finish', async () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        try {
          const userId = req.user?.id;
          if (!userId) return;

          await LogService.createLog({ user_id: userId, type, module });
        } catch (error) {
          console.error('Erro ao criar log:', error);
        }
      }
    });

    next();
  };
}

module.exports = logAction;
