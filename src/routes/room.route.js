const express = require('express');

const roomController = require('../controllers/room.controller');
const deviceController = require('../controllers/device.controller');
// const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', roomController.findAll);
router.post('/', roomController.create);
router.get('/:id', roomController.findOne);
router.put('/:id', roomController.update);
router.delete('/:id', roomController.delete);
router.get('/devices/:id', roomController.findAllDevices);
router.put('/devices/:id', deviceController.update);
// router.get('/', authMiddleware, roomController.findAll);
// router.post('/', authMiddleware, roomController.create);
// router.get('/:id', authMiddleware, roomController.findOne);
// router.put('/:id', authMiddleware, roomController.update);
// router.delete('/:id', authMiddleware, roomController.delete);

module.exports = router;
