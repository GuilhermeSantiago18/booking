const express = require('express');
const router = express.Router();
const LogController = require('../../controllers/LogController');

router.get('/', LogController.listLogs);
router.post('/', LogController.createLog);
router.delete('/:id', LogController.deleteLog);

module.exports = router;
