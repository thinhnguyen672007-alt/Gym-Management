// sau khi đăng nhập server sẽ tự cung cấp một token cho clients sẽ tự lưu ở localStorage hoặc session 
// khi có token này khi reload hoặc quay lại trang web người dùng ko mất công phải đăng nhập lại 
// đoạn token này sẽ hết hạn trong 7 ngày, sau 7 ngày thì người dùng sẽ phải đăng nhập lại
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