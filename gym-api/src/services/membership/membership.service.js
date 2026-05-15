const pool = require("../../models/db.js");
const AppError = require("../../utlis/AppError");

// tạo membership\
const createMembership = async () => {
    const [packages] = await pool. query(
        'select * from packages where id = ? ', [packageId]
    )

    if (packages.length === 0) {
        throw new AppError("Gói tập này không tồn tại!", 404);
    }

    const package_ = packages[0];

    const [existing] = await pool.query(
        'select * from memberships where user_id = ? and status " active" ', [userId]
    )

    if(existing.length > 0) {
        throw new AppError("Bạn đã có hoặc vẫn đang trong thời gian gói tập, vui lòng hủy để đăng ký gói tập khác!")
    }

    const startDate = new Date();
    const endDate = new Date();

    endDate.setDate(endDate.getDate() + package_.duration_days);

    const formatDate = (date) => date.toISOString().split('T')[0];

    const [results] = await pool.query(
        "insert into memberships (user_id, package_id, start_date, end_date) value (?, ?, ?, ?)",
        [userId, packageId, formatDate(startDate), formatDate(endDate)]
    )

    const [memberships] = await pool.query (
        `select m.*, p.name as packageName, p.price, p.duration_days
        from memberships m
        join packages p on m.package_id = p.id
        where m.id = ?`,
        [results.insertId]
    )
    return memberships[0];
}

module.exports = createMembership;

// kiểm tra gói tập đó có tồn tại hay không 

// kiểm tra user có membership hay chưa 

// tính startDate vả endDate 

// lưu vào database 