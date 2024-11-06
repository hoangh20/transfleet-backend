const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    licensePlate: {
        type: String,
        required: true,
        unique: true
    },
    brand: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        enum: [0, 1],  // 0: Xe đầu kéo, 1: Rơ moóc
        required: true
    },
    status: {
        type: Number,
        enum: [0, 1, 2, 3],  // 0: Đang rảnh, 1: Đang thực hiện chuyến, 2: Bảo dưỡng, 3: Không còn sử dụng
        required: true
    },
    technicalSpecifications: {
        type: String,
        required: false
    },
    purchasePrice: {
        type: Number,
        required: true
    },
    depreciationRate: {
        type: Number,
        required: true,
        default: 0
    },
    address: {
        type: String,
        required: false
    },
    location: {
        lat: {
            type: Number,
            required: true
        },
        long: {
            type: Number,
            required: true
        }
    }
}, {
    timestamps: true // Thêm createdAt và updatedAt
});

const Vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = Vehicle;
