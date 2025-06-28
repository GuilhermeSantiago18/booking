const Room = require('../models/Room');
const CustomError = require('../errors/CustomError');

async function createRoom(data) {
  const {
    name,
    capacity,
    description,
    startTime,
    endTime,
    slotDurationMinutes,
  } = data;

  if (!name || !description) {
    throw new CustomError('Preencha os campos para criar a sala', 400);
  }

  const existingRoom = await Room.findOne({ where: { name } });
  if (existingRoom) {
    throw new CustomError('Já existe uma sala com este nome', 409);
  }

  const room = await Room.create({
    name,
    capacity,
    description,
    startTime,
    endTime,
    slotDurationMinutes: slotDurationMinutes || 30,
  });

  return room;
}

async function listRooms() {
  return await Room.findAll();
}

async function getRoomById(id) {
  const room = await Room.findByPk(id);
  if (!room) {
    throw CustomError('Sala não encontrada', 404);
  }
  return room;
}

async function updateRoom(id, data) {
  const room = await Room.findByPk(id);
  if (!room) {
    throw new CustomError('Sala não encontrada', 404);
  }

  if (data.name && data.name !== room.name) {
    const existingRoom = await Room.findOne({ where: { name: data.name } });
    if (existingRoom) {
      throw new CustomError('Já existe uma sala com este nome', 409);
    }
  }

  room.name = data.name || room.name;
  room.capacity = data.capacity !== undefined ? data.capacity : room.capacity;
  room.description = data.description || room.description;
  room.startTime = data.startTime || room.startTime;
  room.endTime = data.endTime || room.endTime;
  room.slotDurationMinutes =
    data.slotDuration || room.slotDurationMinutes;

  await room.save();
  return room;
}

async function deleteRoom(id) {
  const room = await Room.findByPk(id);
  if (!room) {
    throw new CustomError('Sala não encontrada', 404);
  }

  //   const booking = await Booking.findOne({ where: { roomId: id } });
  //   if (booking) {
  //     throw new CustomError('Cannot delete room with existing bookings', 400);
  //   }

  await room.destroy();
}

module.exports = {
  createRoom,
  listRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};
