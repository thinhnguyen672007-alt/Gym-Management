const express = require('express');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3000;
const pool = require('./models/db.js');

dotenv.config();

const app = express();

app.use(express.json());

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


//====================
// RUN SERVER
//====================

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})