const membershipService = require('./membership.service.js');
const AppError = require('../../utlis/AppError');

const getAllMemberships = async (rep, res, next) => {
    try {
        const memberships = await membershipService.getAllMemberships();
        res.status(201).json({
            success: true,
            data: memberships
        })
    } catch (error) {
        next(error);
    }
}

const getMyMemberships = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const memberships = await membershipService.getMyMemberships(userId);

        res.status(201).json({
            success: true,
            data: memberships
        });
    } catch (error) {
        next(error);
    }
}

const createMembership = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { package_id } = req.body;
        if(!package_id) {
            return next(new AppError("Vui long chọn tập!", 400));
        }


        const membership = await membershipService.createMembership(userId,package_id);

        res.status(201).json({
            success: true,
            message: 'Chúc Mừng,bạn đã đăng ký gói tập thành công!',
            data: membership
        });
    } catch(error) {
        next(error);
    }
}



module.exports = { createMembership, getMyMemberships, getAllMemberships };