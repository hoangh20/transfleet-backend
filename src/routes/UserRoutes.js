const express = require("express");
const router =express.Router()
const UserController = require('../controllers/UserController');
const { authMiddleware } = require("../middleware/authMiddleware");


router.post('/sign-up', UserController.createUser)
router.post('/sign-in', UserController.loginUser)
router.put('/update-user/:id', UserController.updateUser)
router.delete('/delete-user/:id',authMiddleware, UserController.deleteUser)
router.get('/get-detail-user/:id', UserController.detailUser)
router.post('/refresh-token', UserController.refreshToken)
router.post('/sign-out', UserController.signoutUser)


module.exports = router