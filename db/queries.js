const pool = require('./pool');

async function getAllTodos() {
    const { rows } = await pool.query(
        `SELECT * FROM todos ORDER BY created_at DESC`
    );
    return rows;
}

module.exports = {
    getAllTodos,
}