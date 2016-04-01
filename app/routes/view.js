module.exports = function (app, userInit) {
    var rModules = require('../modules/routeModules');
    // test pages
    app.get('/test', function (req, res) {
        var getReq = '';
        if (req.query['q'] != undefined) {
            getReq = req.query['q'];
            console.log(getReq);
        }
        console.log(req.session);

        res.render('test.jade', {
            session: req.session
        });

    });

    app.get('/', function (req, res) {
        res.render("index.jade", {}, function (err, result) {
            if (err) rModules.notFound(res);
            else res.send(result); // send rendered HTML back to client
        });

    });

    // File called
    app.get('/:file', function (req, res) {
            if (req.session.user === undefined) {
                req.session.user = userInit;
            }
            var file = req.params.file;
            $ = req.session;
            res.render(file + ".jade", {session: $.user}, function (err, result) {
                if (err) rModules.notFound(res);
                else {
                    res.send(result)
                }
            })
        }
    );
};
