const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { fetchAddressByCep } = require('./CepService');
const { createLog } = require('./LogService');
const CustomError = require('../errors/CustomError');

async function registerClient(data) {
  console.log("data", data)
  const {
    firstName,
    lastName,
    email,
    password,
    postalCode,
    number,
    complement,
    role,
    status,
    canSchedule,
    canViewLogs
  } = data;

  const userExists = await User.findOne({ where: { email } });
  if (userExists) throw new CustomError('Email already registered', 409);

  const { street, district, city, state, cep } =
    await fetchAddressByCep(postalCode);

  console.log('Endereco recebido:', { street, district, city, state });

  const hashedPassword = await bcryptjs.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    cep: cep || postalCode,
    street,
    number,
    complement,
    district,
    city,
    state,
    role: role,
    status,
    canViewLogs,
    canSchedule
  });

  return user;
}

async function login({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new CustomError('Invalid User or Password', 401);

  const passwordValid = await bcryptjs.compare(password, user.password);
  if (!passwordValid) throw new CustomError('Invalid User or Password', 401);

  const token = generateToken({
    id: user.id,
    role: user.role,
    email: user.email,
  });

     await createLog({
      user_id: user.id,
      type: 'Login',
      module: 'Minha conta',
    });


  return { user, token };
}


async function update(userId, data) {
  const user = await User.findByPk(userId);
  if (!user) throw new CustomError('User not found', 404);

  const {
    firstName,
    lastName,
    password,
    postalCode,
    street,
    number,
    complement,
    district,
    city,
    state,
    canSchedule,
    canViewLogs,
    status
  } = data;

  if (password) {
    user.password = await bcryptjs.hash(password, 10);
  }

  user.firstName = firstName ?? user.firstName;
  user.lastName = lastName ?? user.lastName;
  user.cep = postalCode ?? user.cep;
  user.street = street ?? user.street;
  user.number = number ?? user.number;
  user.complement = complement ?? user.complement;
  user.district = district ?? user.district;
  user.city = city ?? user.city;
  user.state = state ?? user.state;
  user.canSchedule = canSchedule ?? user.canSchedule
  user.canViewLogs = canViewLogs ?? user.canViewLogs
  user.status = status ?? user.status

  await user.save();
  return user;
}

async function getUserByID(id) {
  return await User.findByPk(id, {
    attributes: { exclude: ['password'] }, 
  });
}


module.exports = {
  registerClient,
  login,
  update,
  getUserByID
};
