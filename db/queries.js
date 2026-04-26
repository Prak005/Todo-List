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

async function toggleTodo(id) {
    const { rows } = await pool.query(
        `UPDATE todos SET completed = NOT completed WHERE id=$1 RETURNING *`,[id]
    );
    return rows[0];
}

async function deleteTodo(id) {
    await pool.query(
        `DELETE FROM todos WHERE id=$1`,[id]
    );
}

module.exports = {
    getAllTodos,
    createTodo,
    toggleTodo,
    deleteTodo,
}