const CustomError = require('../errors/CustomError');
const Appointment = require('../models/Appointment');
const Room = require('../models/Room');
const User = require('../models/User');
const { logActionManual } = require('./LogAction');

async function createAppointment(userId, { date, time, room }) {
  if (!date || !time || !room) {
    throw new CustomError('Dados de agendamento incompletos', 400);
  }

  const roomExists = await Room.findByPk(room);
  if (!roomExists) {
    throw new CustomError('Sala não encontrada', 404);
  }


  const existing = await Appointment.findOne({
    where: { room_id: room, date, time }
  });

  if (existing) {
    throw new CustomError('Já existe um agendamento para esse horário', 409);
  }

  const reservation = await Appointment.create({
    user_id: userId,
    room_id: room,
    date,
    time,
    status: 'PENDENTE',
  });

  return reservation;
}


async function getAll() {
  return await Appointment.findAll({
    include: [
      {
        model: User,
        attributes: ['firstName', 'lastName'],
      },
      {
        model: Room,
        attributes: ['name'],
      }
    ],
  });
}

async function getAllByUser(userId) {
   return await Appointment.findAll({
    where: { user_id: userId },
    include: [
      { model: User, attributes: ['firstName', 'lastName'] },
      { model: Room, attributes: ['name'] },
    ],
    order: [['createdAt', 'DESC']],
  });
}

async function deleteAppointment(userId, appointmentId, userRole) {
  const appointment = await Appointment.findByPk(appointmentId);
  if (!appointment) {
    throw new CustomError('Agendamento não encontrado', 404);
  }

  if (userRole === 'client' && appointment.user_id !== userId) {
    throw new CustomError('Não autorizado a cancelar este agendamento', 403);
  }

  await Appointment.destroy({ where: { id: appointmentId } });
}

async function updateStatusAppointment(userId, appointmentId, status) {
  const appointment = await Appointment.findByPk(appointmentId);
  if (!appointment) {
    throw new CustomError('Agendamento não encontrado', 404);
  }


  if (status === 'RECUSADO') {
    await logActionManual({
      user_id: userId,
      type: 'Cancelamento de agendamento',
      module: 'Agendamento',
    });
  }

  else if (status === 'CONFIRMADO') {
    await logActionManual({
      user_id: userId,
      type: 'Confirmação de agendamento',
      module: 'Agendamento',
    });
  }

  appointment.status = status;
  await appointment.save();
}





module.exports = {
  createAppointment,
  getAll,
  getAllByUser,
  deleteAppointment,
  updateStatusAppointment
};
