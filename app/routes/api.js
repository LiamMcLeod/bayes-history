module.exports = function (apiRouter) {
    var rModules = require('../modules/routeModules');
    var libs = require('../modules/lib');

    apiRouter.get('/', function (req, res) {
        var results = [];
        var param = {};
        param.pretty = false;
        if (req.query != null) {
            param.pretty = req.query['pretty'];
        }
        var api = {text: "API v0.0.1"};
        return res.json(api);
    });

    apiRouter.get('/api', function (req, res) {
        var results = [];
        var param = {};
        param.pretty = false;
        if (req.query != null) {
            param.pretty = req.query['pretty'];
        }
        return res.send("<pre>" + JSON.stringify({
                title: "API Version 0.0.1",
                properties: {options: "/user"}
            }, null, 2) + "</pre>");
    });

    apiRouter.get('/user', function (req, res) {
        var results;
        // TODO QUERY STUFF
        if (results.isEmpty()) {
            return res.status(404).json({message: "Error: Not Found."});
        }
        if (param.pretty) {
            return res.send("<pre>" + JSON.stringify(results, null, 2) + "</pre>");
        }
        else return res.json(results);
    });

    apiRouter.get('/logout', function (req, res) {

        res.redirect('/user', 400, function (err) {
            if (err) rModules.notFound(res);
        })
    });

    apiRouter.post('/login', function (req, res) {


        res.redirect('/user', 400, function (err) {
            if (err) rModules.notFound(res);
        })
    });


};
