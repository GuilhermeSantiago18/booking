const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/UserController');
const authMiddleware = require('../../middlewares/AuthMiddleware');

router.post('/register', UserController.register);
router.post('/register/admin', UserController.registerAdmin);
router.post('/login', UserController.login);
router.get('/me', authMiddleware, UserController.getUserByID);
router.put('/me', authMiddleware, UserController.updateUser);

module.exports = router;
