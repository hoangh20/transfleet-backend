// controllers/DriverController.js
const DriverService = require('../services/DriverService');
const upload = require('../config/multerConfig')
// Tạo mới một tài xế
const createDriver = async (req, res) => {
  try {
    const driverData = req.body;
    if (req.file) {
      driverData.avatar = req.file.path; 
    }
    const driver = await DriverService.createDriver(driverData);
    res.status(201).json(driver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin tài xế theo ID
const getDriverById = async (req, res) => {
  try {
    const driver = await DriverService.getDriverById(req.params.id);
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách tất cả tài xế
const getAllDrivers = async (req, res) => {
  try {
    const drivers = await DriverService.getAllDrivers();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin tài xế
const updateDriver = async (req, res) => {
  try {
    const updateData = req.body;
    if (req.file) {
      updateData.avatar = req.file.path; // Lấy URL của ảnh từ Cloudinary
    }
    const driver = await DriverService.updateDriver(req.params.id, updateData);
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa tài xế
const deleteDriver = async (req, res) => {
  try {
    const driver = await DriverService.deleteDriver(req.params.id);
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.status(200).json({ message: "Driver deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Không có ảnh được tải lên' });
    }

    res.status(200).json({ url: req.file.path });
  } catch (error) {
    console.error('Lỗi khi upload ảnh:', error);
    res.status(500).json({ message: 'Lỗi khi upload ảnh' });
  }
};

module.exports = {
  createDriver,
  getDriverById,
  getAllDrivers,
  updateDriver,
  deleteDriver,
  uploadAvatar,
};
