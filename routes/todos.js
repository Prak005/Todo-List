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

router.post('/todos', async(req, res) => {
    const { text } = req.body;
    if(text && text.trim()) {
        await createTodo(text);
    }
    const filter = req.body.filter || 'all';
    res.redirect(`/?filter=${filter}`);
});

router.post('/todos/:id/toggle', async(req, res) => {
    await toggleTodo(req.params.id);
    const filter = req.body.filter || 'all';
    res.redirect(`/?filter=${filter}`);
});

module.exports = router;