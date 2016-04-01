module.exports = function (app) {

    var express = require('express');
    var fs = require('fs');
    var acc = require('../app/accounts');

    app.use(express.static(appRoot + '/views', {defaultExtension: 'jade'}));
    app.use('/', express.static(__dirname + '/views'));

    var $;
    var userInit = {
        loggedIn: false,
        data: []
    };
    /* ==========================================================
     * 			 			  Modules						 	*
     * ========================================================== */
    Array.prototype.isEmpty = function () {
        if (this.length === 0) {
            return true;
        } else {
            return false;
        }
    };
    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    function getResults(pgQ, results, res) {
        pgQ.on('row', function (row) {
            results.push(row);
        });
        pgQ.on('end', function () {
            if (results.isEmpty()) {
                return res.status(404).json({message: "Error: Not Found."});
            }
            if (param.pretty) {
                return res.send("<pre>" + JSON.stringify(results, null, 2) + "</pre>");
            }
            else return res.json(results);
        });
    }

    function notFound(res) {
        res.render(appRoot + '/views/404.jade');
        var err = new Error('404');
        err.status = 'Not Found';
    }


    /* ==========================================================
     *		 			 Back-End API						 	*
     * ========================================================== */

    /************************
     *        Search Results    *
     ************************/
    app.get('/api/', function (req, res) {
        var results = [];
        // var searchTerm = req.params.term;
        var param = {};
        param.pretty = false;

        if (req.query != null) {
            param.pretty = req.query['pretty'];
        }

        var qStr = {
            // 	text: ''
            // 	values: [vars]
        };

        var pgQ = pgClient.query(qStr, function (err, result) {
        });

        return getResults(pgQ, req, res);

    });

    app.post('/api/user', function (req, res) {
        $ = req.session;

        // Get user data from DB
        $.user.data = acc.log(req);

        if ($.user.data) {
            $.user.loggedIn = true;
        }
        else {
            $.user.loggedIn = false;
        }

        res.redirect('/user', 400, function (err) {
                if (err) notFound(res);
        })
    });

    /* ==========================================================
     *		 			 Front-End API						 	*
     * ========================================================== */

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
            if (err) notFound(res);
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
                if (err) notFound(res);
                else {
                    res.send(result)
                }
            })
        }
    );

// Catch
    // Misc Errors
    app.get('/500', function (req, res) {
        notFound(res);
    });

    // Catch 404
    app.use(function (req, res) {
        notFound(res);
    });

    //Catch Wildcards
    app.get('/*', function (req, res) {
        res.sendFile(appRoot + '/views/index.html');
        console.log('Input matches: /*');
    });

    app.get('*', function (req, res) {
        res.sendFile(appRoot + '/views/index.html');
        console.log('Input matches: *');
    });
};