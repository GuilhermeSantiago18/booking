const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

async function registerClient(data) {
  const {
    firstName, lastName, email, password,
    cep, street, number, complement,
    district, city, state
  } = data;

  const userExists = await User.findOne({ where: { email } });
  if (userExists) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    cep,
    street,
    number,
    complement,
    district,
    city,
    state,
    role: 'client'
  });

  return user;
}

async function createAdmin(data) {
  const { email, password } = data;

  const userExists = await User.findOne({ where: { email } });
  if (userExists) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    role: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    cep: '00000000',
    street: 'Admin Street',
    number: '0',
    complement: '',
    district: 'Admin District',
    city: 'Admin City',
    state: 'Admin State'
  });

  return user;
}

async function login({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User not found');

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) throw new Error('Invalid password');

  const token = generateToken({ id: user.id, role: user.role, email: user.email });

  return { user, token };
}



module.exports = {
  registerClient,
  createAdmin,
  login,
};
