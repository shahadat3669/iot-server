const express = require('express');

const sensorController = require('../controllers/sensor.controller');

const router = express.Router();

router.get('/', sensorController.findAll);
router.post('/', sensorController.create);
router.get('/:id', sensorController.findOne);
router.put('/:id', sensorController.update);
router.delete('/:id', sensorController.delete);
 
module.exports = router;
