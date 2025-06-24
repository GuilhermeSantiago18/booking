const RoomService = require('../services/RoomService');

async function createRoom(req, res) {
  try {
    const room = await RoomService.createRoom(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

async function listRooms(req, res) {
  try {
    const rooms = await RoomService.listRooms();
    res.json(rooms);
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message });
  }
}

async function getRoomById(req, res) {
  try {
    const room = await RoomService.getRoomById(req.params.id);
    res.json(room);
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message });
  }
}

async function updateRoom(req, res) {
  try {
    const room = await RoomService.updateRoom(req.params.id, req.body);
    res.json(room);
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message });
  }
}

async function deleteRoom(req, res) {
  try {
    await RoomService.deleteRoom(req.params.id);
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message });
  }
}

module.exports = {
  createRoom,
  listRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};
