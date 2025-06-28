const express = require('express');
const router = express.Router();

const AppointmentController = require('../../controllers/AppointmentController');
const adminOnly = require('../../middlewares/AdminOnly');
const logAction = require('../../middlewares/LogAction');

router.get('/', AppointmentController.getAll);
router.post('/', logAction({type: 'Criação de agendamento', module: 'Agendamento'}), AppointmentController.createAppointment);
router.delete('/:id', logAction({type: 'Cancelamento de agenda', module: 'Agendamento'}), AppointmentController.deleteAppointment);
router.patch('/:id', adminOnly, logAction({type: 'Atualização de agendamento', module: 'Agendamento'}) , AppointmentController.updateStatusAppointment);

module.exports = router;
