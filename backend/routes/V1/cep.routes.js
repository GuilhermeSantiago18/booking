const express = require('express');
const router = express.Router();
const { getAddressByCep } = require('../../controllers/CepController');

router.get('/:cep', getAddressByCep);

module.exports = router;
