const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js');




const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./controllers');
const bodyParser = require("body-parser");
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/todo-mvc');
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

// app.use('/public', express.static('public'));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + "./index.html");
})

app.use('/api/todos', router.todoController);

// put routes here

app.listen(3000, function () {
    console.log('Express running on http://localhost:3000/.')
});
