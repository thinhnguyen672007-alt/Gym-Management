// khai báo thư viện cũng dư AppError để xử lý lỗ
const { validationResult }= require('express-validator');
const AppError = require('../utlis/AppError');

// tạo biến validate
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const messages = errors.array().map(e => e.msg).join(', ');
        return next(new AppError(messages, 400));
    }
    next()
}

module.exports = validate;

// kiểm tra request bằng validate rồi gán cho biến lỗi 

// kiểm tra xem có lỗi hay không lí do không dùng if(error) là bởi vì
// khi mà dùng thư viện validation để xử lý lối nó luôn trả ra một object nên có if(error) kia sẽ luôn đúng kể cả khi req sach