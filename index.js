require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoutes = require('./routes/user.routes');
var authRoutes = require('./routes/auth.routes');
var prodRoutes = require('./routes/product.routes');
var cartRoutes = require('./routes/cart.routes');

var authMiddleware = require('./middleware/auth.middleware');
var sessionMiddleware = require('./middleware/session.middleware');

var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index', {
        name: 'a'
    });
});

app.use('/users', authMiddleware.requireAuth, userRoutes);
app.use('/auth', authRoutes);
app.use('/products', prodRoutes);
app.use('/cart', cartRoutes);

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});