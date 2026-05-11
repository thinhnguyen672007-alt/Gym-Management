const packageService = require('./package.service');

const getAllPackages = async (req, res) => {
    try {
        const packages = await packageService.getAllPackages()
        res.status(200).json({
            success : true,
            data : packages
        })
    } catch(error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

const createPackage = async (req, res) => {
    try {
        const {name, price, duration_days, description} = req.body 

        if(!name || !price || !duration_days || !description) {
            return res.json({
                success : false,
                message : "Vui lòng điền đầy đủ thông tin trước khi thêm gói tập mới!"
            })
        }

        if(price <= 100000) {
            return res.json({
                success : false,
                message : "Giá tối thiểu cho một gói tập là 100000 VNĐ"
            })
        }

        if(duration_days <= 30) {
            return res.json({
                success : false,
                message : "Ngày tối thiểu cho một gói tập là 30 ngày "
            })
        }

        const newPackage = await packageService.createPackage(name, price, duration_days, description);

        res.status(201).json({
            success : true,
            message : "Tạo một gói tập mới THÀNH CÔNG!"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

module.exports = { getAllPackages, createPackage};