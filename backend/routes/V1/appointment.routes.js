const express = require('express');
const router = express.Router();

const AppointmentController = require('../../controllers/AppointmentController');
const adminOnly = require('../../middlewares/AdminOnly');
const { logActionMiddleware } = require('../../services/LogAction');

router.get('/', AppointmentController.getAll);
router.post('/', logActionMiddleware({type: 'Criação de agendamento', module: 'Agendamento'}), AppointmentController.createAppointment);
router.delete('/:id', logActionMiddleware({type: 'Cancelamento de agendamento', module: 'Agendamento'}), AppointmentController.deleteAppointment);
router.patch('/:id', logActionMiddleware({type: 'Atualização de agendamento', module: 'Agendamento'}) , AppointmentController.updateStatusAppointment);

module.exports = router;
