// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var Todo = mongoose.model('Todo', {
    id: Number,
    value: String,
    completed: Boolean,
    date: String
});
var cors = require('cors')


mongoose.connect('mongodb://abcd:abcabc1@ds016118.mlab.com:16118/todonote')
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.on('connect', console.log.bind(console, 'MongoDB connection or'));



app.use(express.static(__dirname + '/public/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(cors());

// api ---------------------------------------------------------------------
// get all todos
app.get('/api/todos', function(req, res) {
    Todo.find(
        function(err, todos) {
            if (err)
                res.send(err)

            res.json(todos);
        });
});

app.post('/api/todos', function(req, res) {
    Todo.create({
        id: req.body.id,
        value: req.body.value,
        completed: req.body.completed,
        date: req.body.date
    }, function(err, todo) {
        if (err)
            res.send(err);

        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

app.delete('/api/todos/', function(req, res) {
    Todo.remove({
        id: req.body.id
    }, function(err, todo) {
        if (err)
            res.send(err);

        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

app.put('/api/todos', function(req, res) {
    Todo.update({
        id: req.body.id
    }, { $set: { completed: req.body.completed } }, function(err, todo) {
        if (err) res.send(err);

        Todo.find(function(err, todos) {
            if (err) res.send(err)
            res.json(todos);
        });
    });
});

app.put('/api/todos:id', function(req, res) {
    Todo.update({
        id: req.body.id
    }, { $set: { value: req.body.value } }, function(err, todo) {
        if (err) res.send(err);

        Todo.find(function(err, todos) {
            if (err) res.send(err)
            res.json(todos);
        });
    });
});

app.get('*', function(req, res) {
    res.sendfile('./public/public/index.html');
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);