const express = require('express');
const router = express.Router();
const ClientController = require('../../controllers/ClientController');
const adminOnly = require('../../middlewares/AdminOnly');

router.get('/', adminOnly, ClientController.getAll);
router.put('/:id', adminOnly, ClientController.updateClient);
module.exports = router;
