var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoutes = require('./routes/user.routes');

var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index', {
        name: 'a'
    });
});

app.use('/users', userRoutes);

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});