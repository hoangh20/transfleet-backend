const User = require('../models/UserModel');
const bcrypt =require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../services/JwtService');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser;
        try {
            const checkUser = await User.findOne({ email: email });
            if (checkUser !== null) {
                resolve({
                    status: 'OK',
                    message: 'The email is already in use'
                });
                return;
            }
            const hash = bcrypt.hashSync(password, 10)
            const createUser = await User.create({
                name,
                email,
                password : hash,
                phone
            });

            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createUser
                });
            }
        } catch (error) {
            reject(error)
        }
    });
};
const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;
        try {
            const checkUser = await User.findOne({ email });
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                });
                return;
            }

            const comparePassword = await bcrypt.compare(password, checkUser.password);
            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password or user is incorrect'
                });
                return;
            }

            const access_token = await generateAccessToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin
            });
            const refresh_token = await generateRefreshToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin
            });

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token
            });
        } catch (error) {
            reject(error);
        }
    });
};
const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({_id: id});
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                });
                return;
            }

            const updateUser = await User.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateUser
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({_id: id});
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                });
            }

            await User.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete user successfully',
            });
        } catch (error) {
            reject(error);
        }
    });
};
const detailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(id);
            if (!user) {
                resolve({
                    status: 'ERR',
                    message: 'User not found'
                });
                return;
            }

            resolve({
                status: 'OK',
                message: 'User details retrieved successfully',
                data: user
            });
        } catch (error) {
            reject({
                status: 'ERR',
                message: error.message
            });
        }
    });
};


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    detailUser,
};
