const { fetchAddressByCep } = require('../services/CepService');

async function getAddressByCep(req, res, next) {
  try {
    const cep = req.params.cep;
    const address = await fetchAddressByCep(cep);
    res.status(200).json(address);
  } catch (error) {
    next(error);
  }
}

module.exports = { getAddressByCep };
