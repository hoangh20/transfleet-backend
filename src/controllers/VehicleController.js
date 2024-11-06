const VehicleService = require('../services/VehicleService');

const createVehicle = async (req, res) => {
    try {
        const { licensePlate, brand, imageUrl,technicalSpecifications,address,depreciationRate, type, status, purchasePrice, location } = req.body;
        const typeOptions = [0, 1]; 
        const statusOptions = [0, 1, 2, 3]; 

        if (!licensePlate || !brand || !imageUrl || !technicalSpecifications|| !depreciationRate || !address ||type === undefined || status === undefined || !purchasePrice || !location || !location.lat || !location.long) {
            return res.status(200).json({
                status: 'ERR',
                message: 'All fields are required'
            });
        } else if (!typeOptions.includes(type)) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Invalid vehicle type'
            });
        } else if (!statusOptions.includes(status)) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Invalid vehicle status'
            });
        }

        const response = await VehicleService.createVehicle(req.body);
        return res.status(200).json(response);
    } catch (e) {
        res.status(404).json({ message: e.message });
    }
};
const deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params; 

        if (!id) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Vehicle ID is required',
            });
        }

        const response = await VehicleService.deleteVehicle(id); // Gọi service với id
        if (response.status === 'OK') {
            return res.status(200).json(response);
        } else {
            return res.status(404).json(response);
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
const updateVehicle = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ tham số URL
        const { licensePlate, brand, imageUrl,technicalSpecifications,address,depreciationRate, type, status, purchasePrice, location } = req.body;

        const typeOptions = [0, 1]; // 0: Xe đầu kéo, 1: Rơ moóc
        const statusOptions = [0, 1, 2, 3]; // 0: Đang rảnh, 1: Đang thực hiện chuyến, 2: Bảo dưỡng, 3: Không còn sử dụng

        // Validate input fields
        if (!licensePlate || !brand || !imageUrl || !technicalSpecifications|| !depreciationRate || !address ||type === undefined || status === undefined || !purchasePrice || !location || !location.lat || !location.long) {
            return res.status(400).json({
                status: 'ERR',
                message: 'All fields are required'
            });
        } else if (!typeOptions.includes(type)) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Invalid vehicle type'
            });
        } else if (!statusOptions.includes(status)) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Invalid vehicle status'
            });
        }

        const response = await VehicleService.updateVehicle(id, req.body);
        if (response.status === 'OK') {
            return res.status(200).json(response);
        } else {
            return res.status(404).json(response);
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const getAllVehicles = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; // Mặc định là 10 xe mỗi trang
        const skip = (page - 1) * limit; // Tính toán số lượng xe cần bỏ qua

        const response = await VehicleService.getAllVehicles(skip, limit);
        return res.status(200).json(response);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
const getDetail = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ tham số URL

        // Kiểm tra xem ID có được cung cấp không
        if (!id) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Vehicle ID is required',
            });
        }

        const response = await VehicleService.getDetail(id);
        if (response.status === 'OK') {
            return res.status(200).json(response);
        } else {
            return res.status(404).json(response);
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

module.exports = {
    createVehicle,
    deleteVehicle,
    updateVehicle,
    getAllVehicles,
    getDetail,
}
