const pool = require('./pool');

async function getAllTodos() {
    const { rows } = await pool.query(
        `SELECT * FROM todos ORDER BY created_at DESC`
    );
    return rows;
}

async function createTodo(text) {
    const { rows } = await pool.query(
        `INSERT INTO todos (text) VALUES ($1) RETURNING *`,[text]
    );
    return rows[0];
}

module.exports = {
    getAllTodos,
    createTodo,
}