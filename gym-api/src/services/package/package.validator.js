const { body } = require('express-validator');

const createPackageValidator = [
    body('name')
        .notEmpty().withMessage('Tên gói tập không được để trống')
        .isLength({ max: 100 }).withMessage('Tên gói tập tối đa 100 ký tự'),

    body('price')
        .notEmpty().withMessage('Giá không được để trống')
        .isNumeric().withMessage('Giá phải là số')
        .custom(val => val > 100000).withMessage('Giá tối thiểu 100,000 VNĐ'),

    body('duration_days')
        .notEmpty().withMessage('Số ngày không được để trống')
        .isInt({ min: 1 }).withMessage('Số ngày phải là số nguyên dương'),

    body('description')
        .notEmpty().withMessage('Mô tả không được để trống')
];

const updatePackageValidator = createPackageValidator;

module.exports = { createPackageValidator, updatePackageValidator };