  var mod = require('../modules/routeModules');
  // var libs = require('../modules/lib');

module.exports = function (express, app) {
    // https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
    // https://devdactic.com/restful-api-user-authentication-1/

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


        res.redirect('/user', 400, function (err) {
            if (err) mod.error(req, res, err);
        })
    });


    //Catch All
    apiRouter.get('/*', function(req, res){
        var results;
        mod.returnJSON(res);
    })

    return apiRouter;
};
