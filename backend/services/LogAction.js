const LogService = require('../services/LogService');

function logActionMiddleware({ type, module }) {
  return async (req, res, next) => {
    res.on('finish', async () => {
      try {
        const userId = req.user?.id;
        if (!userId) return;

        await LogService.createLog({ user_id: userId, type, module });
      } catch (error) {
        console.error('Erro ao criar log (middleware):', error);
      }
    });

    next();
  };
}

async function logActionManual({ user_id, type, module }) {
  try {
    await LogService.createLog({ user_id, type, module });
  } catch (error) {
    console.error('Erro ao criar log (manual):', error);
  }
}

module.exports = {
  logActionMiddleware,
  logActionManual,
};
