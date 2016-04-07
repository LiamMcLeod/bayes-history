var mod = require('../modules/routeModules');
// var User = require('../models/User');
// var User = require('../models/User').User;
var User = require('../User');
var jwt = require('jsonwebtoken');

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

        res.redirect('/', 400, function (err) {
            if (err) mod.error(req, res, err);
        })
    });

    apiRouter.post('/login', function (req, res) {
        var user = new User();
        var o = {};
        o.user = req.body.username;
        o.pass = req.body.password;


        // o.exists = user.findUser(o);
        user.findUser(o, function (err, found) {
            if (err) throw err;
            if (found) {
                user.validate(o, function (valid) {
                    // console.log(valid);
                    if (valid) {
                        var obj = {};
                        user = user.getResults();
                        //TODO JSON Web Token;
                        for (var key in user) {
                            obj[key] = user[key];
                        }
                        for (var key in obj) {
                            if (obj[key].trim) {
                                obj[key] = obj[key].trim();
                            }
                        }

                        // obj.ID = user.userId;
                        // obj.Title = user.title;
                        // obj.LastName = user.lastName;
                        // obj.OtherNames = user.otherNames;
                        // obj.EmailAddress=user.emailAddress;
                        // obj.Username = user.username;
                        // obj.Role = user.role;
                        // obj.DoB = user.doB;
                        // obj.Created = user.created;
                        for (var key in obj) {
                            if (obj[key].trim) {
                                obj[key] = obj[key].trim();
                            }
                        }
                        // req.session.user = user.getResults();
                        mod.returnJSON(res, obj)
                    } else {
                        mod.returnJSON(res, [])
                    }
                })
            }
            else mod.returnJSON(res, [])
        });
    });

//Catch All
    apiRouter.get('/*', function (req, res) {
        var results;
        mod.returnJSON(res);
    });

    return apiRouter;
};

// obj.EmailAddress=user.emailAddress;
//                         obj.Username = user.username;
//                         obj.Created = user.created;
//                         obj.DoB = user.doB;
//                         obj.Role = user.role;
//                         obj.OtherNames = user.otherNames;
//                         obj.LastName = user.lastName;
//                         obj.Title = user.title;
//                         obj.ID = user.userId;