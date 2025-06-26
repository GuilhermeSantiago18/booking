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

async function getAll(req, res) {
  try {
    const userId = req.user.id;

    if (req.user.role === 'admin') {
      const all = await AppointmentService.getAll();
      return res.json(all);
    }

    const ownAppointments = await AppointmentService.getAllByUser(userId);
    return res.json(ownAppointments);
  } catch (error) {
    next(error)
  }
}


async function deleteAppointment(req, res, next) {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    const { id } = req.params;

    await AppointmentService.deleteAppointment(userId, id, userRole);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

 

module.exports = {
  createAppointment,
  getAll,
  deleteAppointment
};
