const authService = require('./auth.service')

const register = async (req, res) => {
    try{
        const { name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success : false,
                message : 'Vui lòng điền đầy đủ thông tin!'
            })
        }
        const result = await authService.register(name, email, password);
            res.status(201).json({
                success: true,
                message: 'Đăng ký thành công',
                data: result
        });
    } catch(error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

module.exports = {register};