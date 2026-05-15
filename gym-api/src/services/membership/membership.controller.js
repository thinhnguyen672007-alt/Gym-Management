const membershipService = require('./membership.service.js');
const AppError = require('../../utlis/AppError');

const createMembership = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { package_id } = req.body;
        if(!package_id) {
            return new AppError("Vui long chọn tập!, 400");
        }


        const membership = await membershipService.createMembership(userId,package_id)

        res.status(201).json({
            success: true,
            message: 'Đăng ký gói tập thành công',
            data: membership
        });
    } catch(error) {
        next(error);
    }
}

module.exports = { createMembership };