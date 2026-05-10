const pool = require("../../models/db.js");

const getAllPackages = async () => {
    const [packages] = await pool.query(
        "select * from packages order by price"
    )
    return packages;
}

module.exports = { getAllPackages } 