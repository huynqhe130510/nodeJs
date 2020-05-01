var express = require('express');
var app = express();
var port = 3000;

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', function(req, res) {
    res.render('index', {
        name: 'a'
    });
});

app.get('/user', function(req, res) {
    res.render('users/index', {
        users: [
            { id: 1, name: 'Huy' },
            { id: 2, name: 'Hieu' }
        ]
    });
});

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});