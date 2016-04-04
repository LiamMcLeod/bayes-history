  var mod = require('../modules/routeModules');
  var User = require('../models/User');

module.exports = function (express, app, client) {

    var apiRouter = express.Router();

    apiRouter.get('/', function (req, res) {
        var results = [];
        var param={};
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
        var result=[];
        var o = {};
        o.user = req.body.username.toLowerCase();
        o.pass = req.body.password;
        // console.log(o);

        result = User.findOne(o.user);
        //todo constructor
        //   result = new User();
        //     result.findOne(o.user);
        //https://css-tricks.com/understanding-javascript-constructors/



        res.redirect('/user', 400, function (err) {
            if (err) mod.error(req, res, err);
        })
    });


    //Catch All
    apiRouter.get('/*', function(req, res){
        var results;
        mod.returnJSON(res);
    });

    return apiRouter;
};
