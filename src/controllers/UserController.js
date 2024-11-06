const { refreshTokenJWTService } = require('../services/JwtService');
const UserService = require('../services/UserService');
const JwtService = require('../services/JwtService');

const createUser = async (req, res) =>{
    try {
        const { name, email, password, confirmPassword, phone } = req.body;
        const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const isCheckEmail = reg.test(email);

        if (!name || !email || !password || !confirmPassword || !phone) {
          return res.status(200).json({
            status: 'ERR',
            message: 'The input is required',
          });
        } else if (!isCheckEmail) {
          return res.status(200).json({
            status: 'ERR',
            message: 'The input is email',
          });
        } else if (password !== confirmPassword) {
          return res.status(200).json({
            status: 'ERR',
            message: 'The password must equal confirmPassword',
          });
        }
      
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    }catch(e){
        res.status(404).json({ message: e })
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password,} = req.body;
        const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const isCheckEmail = reg.test(email);

        if (!email || !password) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Email and password are required',
            });
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Invalid email format',
            });
        }

        const response = await UserService.loginUser(req.body);
        const{refresh_token, ...newReponse} = response
        res.cookie('refresh_token',refresh_token,{
            httpOnly: true,
            secure: false,
            samsite: 'strict',
        })
        return res.status(200).json(newReponse);
    } catch (e) {
        res.status(500).json({ status: 'ERR', message: e.message });
    }
};

const updateUser = async (req, res) =>{
    try {
        const userId = req.params.id
        const data = req.body
        if(!userId){
            return res.status(400).json({ message: 'User ID is required' })
        }
      
        const response = await UserService.updateUser(userId, data);
        return res.status(200).json(response)
    }catch(e){
        res.status(404).json({ message: e })
    }
};

const deleteUser = async (req, res) =>{
    try {
        const userId = req.params.id
        const token = req.headers
        if(!userId){
            return res.status(400).json({ message: 'User ID is required' })
        }
      
        const response = await UserService.updateUser(userId);
        return res.status(200).json(response)
    }catch(e){
        res.status(404).json({ message: e })
    }
};
const detailUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const response = await UserService.detailUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token

        if (!token) {
            return res.status(400).json({ message: 'The token is required' });
        }

        const response = await JwtService.refreshTokenJWTService(token);
        return res.status(200).json(response);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
const signoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({ message: 'Sign out successfully' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    detailUser,
    refreshToken,
    signoutUser,
}