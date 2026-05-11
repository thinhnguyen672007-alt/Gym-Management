const pool = require("../../models/db.js");

const getAllPackages = async () => {
    const [packages] = await pool.query(
        "select * from packages order by price"
    )
    return packages;
}

const createPackage = async (name, price, duration_days, description) => {
    const [result] = await pool.query(
        "insert into packages (name, price, duration_days, description) values (?, ?, ?, ?)",
        [name, price, duration_days, description]
    )

    const [packages] = await pool.query(
        "select * from packages where id = ?",
        [result.insertId]
    )

    return packages[0];
}

module.exports = { getAllPackages, createPackage } 