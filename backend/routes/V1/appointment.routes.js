const express = require('express');
const router = express.Router();

const AppointmentController = require('../../controllers/AppointmentController');
const { logActionMiddleware } = require('../../services/LogAction');

router.get('/', AppointmentController.getAll);
router.post('/', logActionMiddleware({type: 'Criação de agendamento', module: 'Agendamento'}), AppointmentController.createAppointment);
router.delete('/:id', AppointmentController.deleteAppointment);
router.patch('/:id' , AppointmentController.updateStatusAppointment);

module.exports = router;
