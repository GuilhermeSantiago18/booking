const express = require('express');
const router = express.Router();

const RoomController = require('../../controllers/RoomController');
const adminOnly = require('../../middlewares/AdminOnly');
const LogAction = require('../../middlewares/LogAction');
const logAction = require('../../middlewares/LogAction');

router.get('/', RoomController.listRooms);
router.post('/', adminOnly, LogAction({type: 'Criação de sala', module: 'Salas'}), RoomController.createRoom);
router.put('/:id', adminOnly, logAction({type: 'Atualização de sala', module: 'Salas'}), RoomController.updateRoom);
router.delete('/:id', adminOnly, RoomController.deleteRoom);

module.exports = router;
