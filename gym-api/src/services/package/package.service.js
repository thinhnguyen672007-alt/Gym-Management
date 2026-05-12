const pool = require("../../models/db.js");
const AppError = require("../../utlis/AppError")

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

const updatePackage = async (id, name, price, duration_days, description) => {
    const [existing] = await pool.query(
        "select * from packages where id = ?",
        [id]
    )

    if(existing.length === 0) {
        throw new AppError("Gói tập này không tồn tại!", 404);
    }

    const [result] = await pool.query(
        "update packages set name = ?, price = ?, duration_days = ?, description = ? where id = ?",
        [name, price, duration_days, description, id]
    )

    const [packages] = await pool.query(
        "select * from packages where id = ?",
        [id]
    )
    return packages[0]
}

const deletePackage = async (id) => {
    const [existing] = await pool.query(
        "select * from packages where id = ?",
        [id]
    )

    if(existing.length === 0) {
        throw new AppError("Gói tập này không tồn tại!", 404);
    }

    await pool.query(
        'delete from packages where id = ?',
        [id]
    )

}

module.exports = { getAllPackages, createPackage, updatePackage, deletePackage } 