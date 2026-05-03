const bcrypt = require('bcryptjs'); // Mã hóa mật khẩu 
const pool = require('../../models/db'); 
const jwt = require('jsonwebtoken');

const register = async (name, email, password) => {
    const [existingUsers] = await pool.query(
        'select id from users where email = ?', [email]
    );
    if (existingUsers.length > 0) {
        throw new Error("Email này đã được sử dụng!");
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Mã hóa mật khẩu 

    const [result] = await pool.query(
        'insert into users (name, email, password) values (?, ?, ?)',
        [name, email, hashedPassword]
    );

    return {userId: result.insertId, name, email};
}

const login = async (email, password) => {
    const [users] = await pool.query(
        "select * from users where email = ?", [email]
    );
    if (users.length === 0) { 
        throw new Error("Email hoặc password không đúng") // có thể là không tồn tại nhưng sử dụng lệnh báo này để giảm khả năng tấn công của hacker 
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        throw new Error("Email hoặc password không đúng");
    }

    const token = jwt.sign({
        userId : user.id,
        email : user.email,
        role : user.role
        },
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );

    return {
        token,
        user : {
            id : user.id,
            name : user.name,
            email : user.email,
            role : user.role
        }
    }
}

module.exports = { register, login } // có ngoặc là bởi vì dự án có thể lớn thêm dùng vậy để đóng gói 



