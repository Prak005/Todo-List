require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');


const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', (req, res) => {
    res.send('Initial Send');
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}\nhttp://localhost:${PORT}`);
});