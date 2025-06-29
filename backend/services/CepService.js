const axios = require('axios');
const CustomError = require('../errors/CustomError');

async function fetchAddressByCep(cep) {
  const cleanCep = cep.replace(/\D/g, '');

  if (cleanCep.length !== 8) {
    throw new CustomError('Invalid CEP format', 400);
  }

  const response = await axios.get(
    `https://viacep.com.br/ws/${cleanCep}/json/`,
  );

  if (response.data.erro) {
    throw new CustomError('CEP não encontrado', 404);
  }

  const { localidade, estado, bairro, logradouro } = response.data;

  return {
    city: localidade,
    state: estado,
    district: bairro,
    street: logradouro,
  };
}

module.exports = {
  fetchAddressByCep,
};
