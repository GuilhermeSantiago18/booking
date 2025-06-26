const AppointmentService = require('../services/AppointmentService');

async function createAppointment(req, res, next) {
  try {
    const userId = req.user.id;
    const appointmenentData = req.body;
    const appointment = await AppointmentService.createAppointment(userId, appointmenentData);
    return res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
}

async function getAll(req, res, next) {
  try {
    const allAppointments = await AppointmentService.getAll();
    return res.status(201).json(allAppointments);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createAppointment,
  getAll
};
