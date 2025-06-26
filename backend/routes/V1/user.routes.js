const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/UserController');
const authMiddleware = require('../../middlewares/AuthMiddleware');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/me', authMiddleware, UserController.updateUser);
router.put('/me', authMiddleware, UserController.updateUser);

module.exports = router;
