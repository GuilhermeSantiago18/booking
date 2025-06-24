const axios = require('axios');

async function fetchAddressByCep(cep) {
  const cleanCep = cep.replace(/\D/g, '');

  if (cleanCep.length !== 8) {
    throw new Error('Invalid CEP format');
  }

  const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);

  if (response.data.erro) {
    throw new Error('CEP not found');
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
