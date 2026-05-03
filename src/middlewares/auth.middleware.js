const jwt = require("jsonwebtoken");
require('dotenv').config();

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];  // tìm và lấy tiêu đề Authorization
    const token = authHeader && authHeader.split(' ')[1]; // Phải có authHeader và phần mã hóa mật khẩu 

    if(!token) {
        return res.status(401).json({
            success : false,
            message : 'Không tìm thấy token, vui lòng đăng nhập lại!'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(error) {
        return res.status(403).json({
            succes : false,
            message : " Token không hợp lệ hoặc có thể hết hạn!"
        })
    }
}

module.exports = { authenticate };