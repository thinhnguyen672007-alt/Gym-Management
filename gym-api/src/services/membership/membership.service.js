const pool = require("../../models/db.js");
const AppError = require("../../utlis/AppError");

const getMyMemberships = async (userId) => {
    const [memberships] = await pool.query (
        `select m.*, p.name, p.price, p.duration_days
        from memberships m
        join packages p on m.package_id = p.id
        where m.user_id = ?
        order by m.created_at desc`, [userId]
    )

    // tự đông chuyển thành expried khi hết hạn 
    const today = new Date().toISOString().split('T')[0];
    for(const m of memberships) {
        if (m.status === 'active' && m.end_date < today) {
            await pool.query(
                'update memberships set status ="expired" where id = ?',[m.id]
            )
            m.status = 'expired';
        }
    }
    return memberships;
}

const getAllMemberships = async () => {
    const [memberships] = await pool.query(
        `select m.*,
        u.name as user_name, u.email as user_email,
        p.name as package_name, p.price, p.duration_days
        from memberships m
        join users u on m.user_id = u.id
        join packages p on m.package_id = p.id 
        order by m.created_at desc`
    )
    const today = new Date().toISOString().split('T')[0];
    for (const m of memberships) {
        if (m.status === 'active' && m.end_date < today) {
            await pool.query(
                'UPDATE memberships SET status = "expired" WHERE id = ?', [m.id]
            );
            m.status = 'expired';
        }
    }

    return memberships;
}

// tạo membership\
const createMembership = async (userId, packageId) => {
    const [packages] = await pool.query(
        'select * from packages where id = ? ', [packageId]
    )

    if (packages.length === 0) {
        throw new AppError("Gói tập này không tồn tại!", 404);
    }

    const package_ = packages[0];

    const [existing] = await pool.query(
        `select * from memberships where user_id = ? AND status = 'active' `, [userId]
    )

    if(existing.length > 0) {
        throw new AppError("Bạn đang trong thời gian gói tập, vui lòng hủy để đăng ký gói tập khác!",400)
    }

    const startDate = new Date();
    const endDate = new Date();

    endDate.setDate(endDate.getDate() + package_.duration_days);

    const formatDate = (date) => date.toISOString().split('T')[0];

    const [result] = await pool.query(
        "insert into memberships (user_id, package_id, start_date, end_date) values (?, ?, ?, ?)",
        [userId, packageId, formatDate(startDate), formatDate(endDate)]
    )

    const [memberships] = await pool.query (
        `select m.*, p.name as package_name, p.price, p.duration_days
        from memberships m
        join packages p on m.package_id = p.id
        where m.id = ?`,
        [result.insertId]
    )
    return memberships[0];
}
// tạo cancelmembership 
// kiểm tra membership có tồn tại không 
// kiểm tra membership này có thuộc quyền sở hữu của user này không 
// kểm tra status có active không 
// cập nhật status thành cancelled 
// return ra cái id của membership và trạng thái là cancelled 
const cancelMembership = async (membershipId, userId) => {
    const [memberships] = await pool.query(
        'select * from memberships where id = ?', [membershipId]
    )

    if (memberships.length === 0) {
        throw new AppError("Membership này không tồn tại vui lòng thử lại!", 404);
    }

    const membership = memberships[0];

    if (membership.user_id  !== userId) {
        throw new AppError("Bạn không thuộc quyền sở hữu gói membership này!", 403);
    }

    if( membership.status !== 'active')  {
        throw new AppError( `Không thể hủy membership khi có status là: ${membership.status}`, 400)
    }

    await pool.query(
        `update memberships set status = 'cancelled' where id = ?`, [membershipId]
    )

    return {id : membershipId, status : 'cancelled'};
}



module.exports = { createMembership, getMyMemberships, getAllMemberships, cancelMembership};

