var User = require('../models/user.model');

var md5 = require('md5');

module.exports.login = function(req, res) {
    res.render('auth/login');
};

module.exports.postLogin = async function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    var user = await User.findOne({ email: email });

    if (!user) {
        res.render('auth/login', {
            errors: [
                'User does not exist'
            ],
            values: req.body
        });
        return;
    }

    var hashPassword = md5(password);

    if (user.password !== hashPassword) {
        res.render('auth/login', {
            errors: [
                'Wrong password'
            ],
            values: req.body
        });
        return;
    }

    res.cookie('userId', user.id, {
        signed: true
    });
    res.redirect('/users');
};