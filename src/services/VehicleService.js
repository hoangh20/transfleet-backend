const Vehicle = require('../models/VehicleModel');

const createVehicle = (newVehicle) => {
    return new Promise(async (resolve, reject) => {
        const { licensePlate, brand, imageUrl,technicalSpecifications, type, depreciationRate,status, purchasePrice, address, location } = newVehicle;

        try {
            // Kiểm tra xem xe đã tồn tại hay chưa
            const checkVehicle = await Vehicle.findOne({ licensePlate: licensePlate });
            if (checkVehicle !== null) {
                resolve({
                    status: 'OK',
                    message: 'The vehicle license plate is already in use'
                });
                return;
            }

            // Tạo xe mới
            const createVehicle = await Vehicle.create({
                licensePlate,
                brand,
                imageUrl,
                technicalSpecifications,
                type,
                status,
                purchasePrice,
                address,
                depreciationRate,
                location
            });

            if (createVehicle) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createVehicle
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
const deleteVehicle = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm và xóa xe dựa trên ID
            const deletedVehicle = await Vehicle.findByIdAndDelete(id);

            if (!deletedVehicle) {
                resolve({
                    status: 'ERR',
                    message: 'Vehicle not found'
                });
                return;
            }

            resolve({
                status: 'OK',
                message: 'Vehicle deleted successfully',
                data: deletedVehicle
            });
        } catch (error) {
            reject(error);
        }
    });
};
const updateVehicle = (id, updatedData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Cập nhật xe dựa trên ID
            const updatedVehicle = await Vehicle.findByIdAndUpdate(id, updatedData, { new: true });

            if (!updatedVehicle) {
                resolve({
                    status: 'ERR',
                    message: 'Vehicle not found'
                });
                return;
            }

            resolve({
                status: 'OK',
                message: 'Vehicle updated successfully',
                data: updatedVehicle
            });
        } catch (error) {
            reject(error);
        }
    });
};
const getAllVehicles = (skip, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalVehicles = await Vehicle.countDocuments(); // Đếm tổng số xe
            const vehicles = await Vehicle.find().skip(skip).limit(limit); // Lấy danh sách xe với phân trang

            resolve({
                status: 'OK',
                message: 'Vehicles retrieved successfully',
                data: vehicles,
                total: totalVehicles,
                page: Math.ceil(totalVehicles / limit) // Tổng số trang
            });
        } catch (error) {
            reject(error);
        }
    });
};
const getDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm xe dựa trên ID
            const vehicle = await Vehicle.findById(id);

            if (!vehicle) {
                resolve({
                    status: 'ERR',
                    message: 'Vehicle not found'
                });
                return;
            }

            resolve({
                status: 'OK',
                message: 'Vehicle retrieved successfully',
                data: vehicle
            });
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    createVehicle,
    deleteVehicle,
    updateVehicle,
    getAllVehicles,
    getDetail,
}
