const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config()

const generateAccessToken =  async (payload) => {
        const access_token = jwt.sign({
            ...payload
        }, process.env.ACCESS_TOKEN, {expiresIn: '1h'})
        return access_token
}
const generateRefreshToken =  async (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, {expiresIn: '365d'})
    return refresh_token
}

const refreshTokenJWTService =  async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, (err, res) => {
            if (err) {
                resolve({
                    status: 'ERR',
                    message: 'Invalid refresh token'
                })
            }
        })
        const { payload } = user
        const access_token = await generateAccessToken({
            id: user?.id,
            isAdmin: user?.isAdmin
        })
        resolve({
            status: 'OK',
            message: 'Successfully',
            data: user
        });
        } catch (error) {
            reject({
                status: 'ERR',
                message: error.message
            });
        }
    });
}
module.exports = {
    generateAccessToken,
    generateRefreshToken,
    refreshTokenJWTService
}