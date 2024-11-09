// services/DriverService.js
const Driver = require('../models/DriverModel');

// Tạo mới một tài xế
const createDriver = async (driverData) => {
  // Gán giá trị mặc định cho successfulTrips và failedTrips nếu không được cung cấp
  driverData.successfulTrips = 0;
  driverData.failedTrips = 0;
  
  const driver = new Driver(driverData);
  return await driver.save();
};

// Lấy thông tin tài xế theo ID
const getDriverById = async (driverId) => {
  return await Driver.findById(driverId);
};

// Lấy danh sách tất cả tài xế
const getAllDrivers = async () => {
  return await Driver.find();
};

// Cập nhật thông tin tài xế
const updateDriver = async (driverId, updateData) => {
  return await Driver.findByIdAndUpdate(driverId, updateData, { new: true });
};

// Xóa tài xế
const deleteDriver = async (driverId) => {
  return await Driver.findByIdAndDelete(driverId);
};

module.exports = {
  createDriver,
  getDriverById,
  getAllDrivers,
  updateDriver,
  deleteDriver
};
