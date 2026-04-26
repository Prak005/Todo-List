const express = require('express');
const router = express.Router();

const db = require('../db/queries');

router.get('/', async(req, res) => {
    const filter = req.query.filter || 'all';
    const allTodos = await getAllTodos();
    let todos = allTodos;
    if(filter === 'active'){
        todos = allTodos.filter((t) => !t.completed);
    }
    if(filter === 'completed'){
        todos = allTodos.filter((t) => t.completed);
    }
    res.render('index', {
        todos,
        filter,
        totalCount: allTodos.length,
        doneCount: allTodos.filter((t) => t.completed).length,
    });
});

module.exports = router;