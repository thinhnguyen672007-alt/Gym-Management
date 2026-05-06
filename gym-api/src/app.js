const express = require('express');
const dotenv = require('dotenv'); // thư viên quản lý biên môi trường trong .evn
const PORT = process.env.PORT || 3000;
const pool = require('./models/db.js');
const { authenticate } = require('./middlewares/auth.middleware');
const { requireAdmin } = require('./middlewares/role.middleware');
const logger = require('./middlewares/logger.middleware.js'); 
const limiter = require('./middlewares/rateLimit.middleware.js')
const cors = require('cors'); // cho phép be và fe kết nối với nhau vì ở hai port khác nhau 


dotenv.config();

const app = express();

app.use(express.json());
app.use(logger); // global middleware
app.use(limiter); // global middleware
app.use(express.static('public'));
app.use(cors({
    origin: 'http://localhost:5173'
}));

//===================
// ROUTE GET
//===================

app.use('/api/auth', require('./services/auth/auth.route'));

app.get('/', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        connection.release();
        res.json({
            success : true,
            message : 'Kết nối database thành công!'
        })
    } catch(error) {
        res.status(500).json({
            sucess : false,
            message : 'Kết nối database thất bại :' + error.message
        })
    }
});

//================================
//Route test đăng ký và đăng nhập 
//================================


// Đăng nhập
app.get('/api/protected', authenticate, (req, res) => {
    res.json({
        success : true,
        message : `Xin chao ${req.user.name}!`,
        role : req.user.role
    })
})

// cho admin
app.get('/api/admin', authenticate, requireAdmin, (req, res) => {
    res.json({
        success : true,
        message : 'Bạn là admin!'
    })
})



//====================
// RUN SERVER
//====================

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})