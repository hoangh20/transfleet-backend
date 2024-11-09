
const express = require('express');
const DriverController = require('../controllers/DriverController');
const upload = require('../config/multerConfig');
const router = express.Router();

router.post('/create-drivers',  upload.single('avatar'), DriverController.createDriver);
router.get('/get-all-drivers', DriverController.getAllDrivers);
router.get('/get-detail-drivers/:id', DriverController.getDriverById);
router.put('/update-drivers/:id',  upload.single('avatar'), DriverController.updateDriver);
router.delete('/delete-drivers/:id', DriverController.deleteDriver);
router.post('/upload-avatar', upload.single('avatar'), DriverController.uploadAvatar);


module.exports = router;
