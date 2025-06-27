const ClientService = require('../services/ClientService')

async function getAll(req, res, next) {
  try {
    const allClients = await ClientService.getAll();
    res.json(allClients);
  } catch (error) {
    next(error);
  }
}

module.exports = { getAll }
