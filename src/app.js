const express = require('express');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3000;

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        'success' : true,
        'message' : 'Gym API is running 💪'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})