const express = require('express');
const router = express.Router();

const RoomController = require('../../controllers/RoomController');
const adminOnly = require('../../middlewares/AdminOnly');
const { logActionMiddleware } = require('../../services/LogAction');

router.get('/', RoomController.listRooms);
router.post('/', adminOnly, logActionMiddleware({type: 'Criação de sala', module: 'Salas'}), RoomController.createRoom);
router.put('/:id', adminOnly, logActionMiddleware({type: 'Atualização de sala', module: 'Salas'}), RoomController.updateRoom);
router.delete('/:id', adminOnly, RoomController.deleteRoom);

module.exports = router;
