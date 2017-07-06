const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./controllers/todo-controller');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/todo-mvc');


app.use('/static', express.static('static'));

app.use('/api/todos', router);

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/static/index.html");
})

// put routes here

app.listen(3000, function () {
    console.log('Express running on http://localhost:3000/.')
});
