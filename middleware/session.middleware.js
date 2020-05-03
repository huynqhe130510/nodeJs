var shortid = require('shortid');

var db = require('../db');

module.exports = function(req, res, next) {
    if (!req.signedCookies.sessionId) {
        var sessionId = shortid.generate();
        //create cookie
        res.cookie('sessionId', sessionId, {
            signed: true
        });

        db.get('sessions').push({
            id: sessionId
        }).write();
    }

    var sessionId = req.signedCookies.sessionId;

    res.locals.quantity = db
        .get("sessions")
        .find({ id: sessionId })
        .get("cart")
        .size()
        .value()

    next();
}