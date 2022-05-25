const express = require('express');

const deviceController = require('../controllers/device.controller');
// const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', deviceController.findAll);
router.post('/', deviceController.create);
router.get('/:id', deviceController.findOne);
router.put('/:id', deviceController.update);
router.delete('/:id', deviceController.delete);
// router.get('/', authMiddleware, deviceController.findAll);
// router.post('/', authMiddleware, deviceController.create);
// router.get('/:id', authMiddleware, deviceController.findOne);
// router.put('/:id', authMiddleware, deviceController.update);
// router.delete('/:id', authMiddleware, deviceController.delete);
module.exports = router;
