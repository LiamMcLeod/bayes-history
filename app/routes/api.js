var mod = require('../modules/routeModules');
var User = require('../models/User');
// var jwt = require('jsonwebtoken');

// var User = require('../models/User').User;

module.exports = function (express) {

    var apiRouter = express.Router();

    apiRouter.get('/', function (req, res) {
        var results = [];
        var param = {};
        param = mod.checkParams(req, res);
        results = {
            title: "API Version 0.0.1",
            properties: {options: "/user"}
        };
        mod.returnJSON(res, results, param);
    });

    apiRouter.get('/user', function (req, res) {
        var results;
        // TODO QUERY STUFF
        var param = mod.checkParams(req, res);
        mod.returnJSON(res, results, param);
    });

    apiRouter.get('/users', function (req, res) {
        var results;
        // TODO QUERY STUFF
        var params = mod.checkParams(req, res);
        mod.returnJSON(res, results, params);
    });

    apiRouter.get('/logout', function (req, res) {
        req.session.destroy();
        // delete req.session;
        res.redirect('/', 303, function (err) {
            if (err) mod.error(req, res, err);
        })
    });

    apiRouter.post('/login', function (req, res) {
        //http://1000hz.github.io/bootstrap-validator/
        var user = new User();
        var o = {};
        delete req.session.status;
        //TODO FINISH THIS
        if (!req.body.username || typeof req.body.username === 'undefined' || req.body.username === null || req.body.username === '') {
            req.session.loggedIn = false;
            req.session.status = 'Username empty.';
            res.redirect(303, '/user');
            // mod.returnJSON(res, {success: false, message: "Username empty"})
        } else {
            o.user = req.body.username;
        }
        if (!req.body.password || typeof req.body.password === 'undefined' || req.body.password === null || req.body.password === '') {
            req.session.loggedIn = false;
            req.session.status = 'Password empty.';
            res.redirect(303, '/user');
            // mod.returnJSON(res, {success: false, message: "Password empty"})
        }
        else {
            o.pass = req.body.password;
        }
        // o.exists = user.findUser(o);
        user.findUser(o, function (err, found, userData) {
            if (err) throw err;
            if (found) {
                // console.log(data);
                user.validate(o, function (valid) {
                    // console.log(valid);
                    if (valid) {
                        var obj = {};
                        //TODO JSON Web Token;
                        // for (var key in userData) {
                        //     obj[key] = userData[key];
                        // }
                        for (var key in userData) {
                            if (userData[key].trim) {
                                userData[key] = userData[key].trim();
                            }
                        }
                        
                        userData.Created = userData.Created.toString();
                        userData.DateOfBirth = userData.DateOfBirth.toString();

                        req.session.loggedIn = true;
                        req.session.user = userData;
                        req.session.status = 'Success';
                        res.redirect(302, '/user');
                    } else {
                        req.session.loggedIn = false;
                        req.session.status = 'Incorrect password.';
                        res.redirect(303, '/user');
                        // mod.returnJSON(res, {success: false, message: "Password incorrect"})
                    }
                })
            }
            else {
                req.session.loggedIn = false;
                req.session.status = 'Incorrect username.';
                res.redirect(303, '/user');
                // mod.returnJSON(res, {success: false, message: "Username does not exist"})
            }
        });
    });

//Catch All
    apiRouter.get('/*', function (req, res) {
        var results;
        mod.returnJSON(res);
    });

    return apiRouter;
};

//                         obj.EmailAddress=user.emailAddress;
//                         obj.Username = user.username;
//                         obj.Created = user.created;
//                         obj.DoB = user.doB;
//                         obj.Role = user.role;
//                         obj.OtherNames = user.otherNames;
//                         obj.LastName = user.lastName;
//                         obj.Title = user.title;
//                         obj.ID = user.userId;