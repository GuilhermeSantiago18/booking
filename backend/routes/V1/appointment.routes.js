const express = require('express');
const router = express.Router();

const AppointmentController = require('../../controllers/AppointmentController');
const adminOnly = require('../../middlewares/AdminOnly');

router.get('/', AppointmentController.getAll);
router.post('/', AppointmentController.createAppointment);
router.delete('/:id', AppointmentController.deleteAppointment);

module.exports = router;
