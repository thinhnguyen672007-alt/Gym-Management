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

module.exports = { getAllPackages };