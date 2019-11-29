var express = require('express');
var app = express();
var path = require('path');
require('dotenv').config()

let cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let cookieParser = require('cookie-parser');
app.use(cookieParser());

var login = require('./login');
var users = require('./routes/user');
var surveys = require('./routes/survey');
var answer_options = require('./routes/answer_option');
var questions = require('./routes/question');
var answers = require('./routes/answer');
var accounts = require('./routes/account');

app.use('/login', login);
app.use('/users', users);
app.use('/surveys', surveys);
app.use('/questions', questions);
app.use('/answer_options', answer_options);
app.use('/answers', answers);
app.use('/accounts', accounts);

//Here we define URL path for front-end, static files, which is built with react as wildcard
app.use(express.static(path.join(__dirname, 'build/')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

var port = 3000;

app.listen(process.env.SERVER_PORT || port, () =>
  console.log('server running on localhost:3000')
);

// var http = require('http');
// var server = http.createServer(app);
// server.listen()

module.exports = app;
