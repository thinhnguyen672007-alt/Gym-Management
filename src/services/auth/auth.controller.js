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
                message: 'Đăng ký thành công!',
                data: result
        });
    } catch(error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

const login = async (req, res) => {
    try{
        const { email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({
                success : false,
                message : 'Vui lòng điền đủ thông tin!'
            });
        }
        const result = await authService.login(email, password);
        res.status(201).json({
            success : true,
            message : "Đăng nhập thành công!",
            data : result
        })
    } catch(error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

const createAdmin = async (req, res) => {
    try{
        const { name, email, password, masterKey} = req.body;

        if (masterKey !== process.env.MASTER_KEY) {
            return res.status(403).json({
                success: false,
                message: 'Master key ( chỉ có admin mới có ) không hợp lệ!'
            })
        }

        if (!name || !email || !password) {
            return res.status(400).json({
                success : false,
                message : 'Vui lòng điền đầy đủ thông tin!'
            })
        }

        const result = await authService.createAdmin(name, email, password);

        res.status(201).json({
            success: true,
            message: 'Đăng ký thành công!',
            data: result
        });

    } catch(error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

module.exports = {register, login, createAdmin};