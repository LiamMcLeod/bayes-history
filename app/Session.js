exports = function (app, session) {
    var pgStore = require('connect-pg-simple')(session);
    var uuid = require('node-uuid');
    Session = {
        genid: function (req) {
            return uuid();
        },
        secret: config.secret,
        proxy: true,
        resave: true,
        saveUninitialized: true,
        store: new pgStore(config.db.url),
        cookie: {secure: true, maxAge: 1800000}
    }
};