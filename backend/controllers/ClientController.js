const ClientService = require('../services/ClientService')

async function getAll(req, res, next) {
  try {
    const allClients = await ClientService.getAll();
    res.json(allClients);
  } catch (error) {
    next(error);
  }
}


async function updateClient(req, res, next) {
  try {
    const client = await ClientService.updateClient(req.params.id, req.body);
    res.json(client);
  } catch (error) {
    next(error);
  }
}


module.exports = { getAll, updateClient }
