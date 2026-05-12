const packageService = require('./package.service');

const getAllPackages = async (req, res, next) => {
    try {
        const packages = await packageService.getAllPackages()
        res.status(200).json({
            success : true,
            data : packages
        })
    } catch(error) {
       next(error);
    }
}

const createPackage = async (req, res, next) => {
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
        next(error);
    }
}

const updatePackage = async (req, res, next) => {
     try {
        const {id} = req.params;
        const {name, price, duration_days, description} = req.body;

        if(!name || !price || !duration_days || !description) {
            return res.json({
                success : false,
                message : "Vui lòng điền đầy đủ thông tin trước khi thêm gói tập mới!"
            })
        }

        const packageUpdated = await packageService.updatePackage(id, name, price, duration_days, description)

        res.status(201).json({
            success : true,
            message : "Cập nhật gói tập THÀNH CÔNG!"
        })
    } catch(error) {
        next(error);
    }
}

const deletePackage = async (req, res, next) => {
    try {
        const {id} = req.params;

        const packageDeleted = await packageService.deletePackage(id);

        res.status(201).json({
            success : true,
            message : "Xóa gói tập THÀNH CÔNG!"
        })
    } catch(error) {
        next(error);
    }
}

module.exports = { getAllPackages, createPackage, updatePackage, deletePackage};