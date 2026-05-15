const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const logger = require('./middlewares/logger.middleware.js');
const limiter = require('./middlewares/rateLimit.middleware.js');
const pool = require('./models/db.js');
const { authenticate } = require('./middlewares/auth.middleware');
const { requireAdmin } = require('./middlewares/role.middleware');
const errorHandler = require('./middlewares/error.middleware')

dotenv.config(); // phải gọi trước khi dùng process.env

const PORT = process.env.PORT || 3000;
const app = express();

// ── GLOBAL MIDDLEWARES ──
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(logger);
app.use(limiter);


// ── ROUTES ──
app.use('/api/auth', require('./services/auth/auth.route'));
app.use('/api/packages', require('./services/package/package.route.js'));
app.use('/api/memberships', require('./services/membership/membership.route'));

app.use(errorHandler);

// ── TEST ROUTES ──
app.get('/', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        connection.release();
        res.json({ success: true, message: 'Chúc mừng, kết nối database thành công!' });
    } catch(error) {
        res.status(500).json({ success: false, message: 'Kết nối database thất bại: ' + error.message });
    }
});

app.get('/api/protected', authenticate, (req, res) => {
    res.json({ success: true, message: `Xin chào ${req.user.name}!`, role: req.user.role });
});

app.get('/api/admin', authenticate, requireAdmin, (req, res) => {
    res.json({ success: true, message: 'Bạn là admin!' });
});

// ── RUN SERVER ──
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});