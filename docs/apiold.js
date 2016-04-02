module.exports = function (apiRouter) {
    // String.prototype.contains = function(it) { return this.indexOf(it) != -1; };
    // Array.prototype.isEmpty = function(){if(this.length===0) {return true;}else{return false;}};
    var rModules = require('../app/modules/routeModules');
    var libs = require('../app/modules/lib');

    app.get('/', function (req, res) {
        var results = [];
        var param = {};
        param.pretty = false;
        if (req.query != null) {
            param.pretty = req.query['pretty'];
        }
        var api = {text: "API v0.0.1"};
        return res.json(api);
    });

    app.get('/api', function (req, res) {
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

    app.get('/api/user', function (req, res) {
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

    api.get('/api/logout', function (req, res) {

        res.redirect('/user', 400, function (err) {
            if (err) rModules.notFound(res);
        })
    });

    api.post('/api/login', function (req, res) {


        res.redirect('/user', 400, function (err) {
            if (err) rModules.notFound(res);
        })
    });


};
