const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: 'Bạn đã gửi quá nhiều request, thử lại sau 15 phút'
    }
})

module.exports = limiter;