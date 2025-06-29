const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/UserController');
const authMiddleware = require('../../middlewares/AuthMiddleware');
const { logActionMiddleware } = require('../../services/LogAction');

router.post('/register', UserController.register);
router.post('/register/admin', UserController.registerAdmin);
router.post('/login', UserController.login);
router.get('/me', authMiddleware, UserController.getUserByID);
router.put('/me', authMiddleware, logActionMiddleware({type: 'Atualização de dados pessoais', module: 'Minha conta'}),  UserController.updateUser);

module.exports = router;
