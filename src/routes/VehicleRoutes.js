const express = require("express");
const router =express.Router()
const VehicleController = require('../controllers/VehicleController')

router.post('/create', VehicleController.createVehicle)
router.delete('/delete/:id', VehicleController.deleteVehicle)
router.put('/update/:id', VehicleController.updateVehicle)
router.get('/get-all-vehicles', VehicleController.getAllVehicles)
router.get('/get-detail/:id', VehicleController.getDetail)

module.exports = router