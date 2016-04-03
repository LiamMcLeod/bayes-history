module.exports = function (app, userInit) {
    var mod = require('../modules/routeModules');
    var lib = require('../modules/lib');
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
    app.get('/sess', function (req, res) {
        $ = req.session;
        if ($.views) {
            $.views++;
            res.setHeader('Content-Type', 'text/html');
            res.write('<p>views: ' + $.views + '</p>');
            res.write('<p>expires in: ' + ($.cookie.maxAge / 1000) + 's</p>');
            res.end()
        } else {
            $.views = 1;
            res.end('welcome to the session demo. refresh!')
        }
    });
    app.get('', function (req, res) {
        $ = req.session;
        res.render("index.jade", {session: $, bg: lib.rnd()}, function (err, result) {
            if (err) mod.error(req, res, err);
            else res.send(result); // send rendered HTML back to client
        });

    });
    app.get('/', function (req, res) {
        $ = req.session;
        res.render("index.jade", {session: $, bg: lib.rnd()}, function (err, result) {
            if (err) mod.error(req, res, err);
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
            res.render(file + ".jade", {session: $.user, bg: lib.rnd()}, function (err, result) {
                if (err) mod.error(req, res, err);
                else res.send(result)

            })
        }
    );
};
