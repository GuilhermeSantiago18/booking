const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const { fetchAddressByCep } = require("./CepService");
const CustomError = require("../errors/CustomError");

async function registerClient(data) {
  const {
    firstName,
    lastName,
    email,
    password,
    postalCode,
    number,
    complement,
    role,
  } = data;

  const userExists = await User.findOne({ where: { email } });
  if (userExists) throw new CustomError("Email already registered", 409);

  const { street, district, city, state, cep } =
    await fetchAddressByCep(postalCode);

  console.log("Endereco recebido:", { street, district, city, state });

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
  });

  return user;
}

async function createAdmin(data) {
  const { email, password } = data;

  const userExists = await User.findOne({ where: { email } });
  if (userExists) throw new CustomError("Email already registered", 409);

  const hashedPassword = await bcryptjs.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    role: "admin",
    firstName: "Admin",
    lastName: "User",
    cep: "0000000",
    street: "Admin Street",
    number: "0",
    complement: "",
    district: "Admin District",
    city: "Admin City",
    state: "Admin State",
  });

  return user;
}

async function login({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new CustomError("User not found", 404);

  const passwordValid = await bcryptjs.compare(password, user.password);
  if (!passwordValid) throw new CustomError("Invalid password", 401);

  const token = generateToken({
    id: user.id,
    role: user.role,
    email: user.email,
  });

  return { user, token };
}

module.exports = {
  registerClient,
  createAdmin,
  login,
};
