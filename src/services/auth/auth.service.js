const bcrypt = require('bcryptjs'); // Mã hóa mật khẩu 
const pool = require('../../models/db'); 

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
        [name, email, password]
    );

    return {userID: result.insertID, name, email};
}

module.exports = { register } // có ngoặc là bởi vì dự án có thể lớn thêm dùng vậy để đóng gói 



