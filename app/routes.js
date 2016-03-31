module.exports = function (app) {

    var express = require('express');
    var fs = require('fs');

    app.use(express.static(appRoot + '/views', {defaultExtension: 'jade'}));
    app.use('/', express.static(__dirname + '/views'));


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

    function getResults(qQuery, results, res) {
        qQuery.on('row', function (row) {
            results.push(row);
        });
        qQuery.on('end', function () {
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

    function exists(directory, callback) {
        fs.stat(directory, function (err, stats) {
            if (err && err.errno === 34) {
                throw err;
            } else {
                return true;
            }
        });
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

        var qQuery = pgClient.query(qStr, function (err, result) {
        });

        return getResults(qQuery, req, res);

    });

    /* ==========================================================
     *		 			 Front-End API						 	*
     * ========================================================== */

    // test pages
    app.get('/test', function (req, res) {

        var getReq = req.query['q'];
        console.log(getReq);

        res.render('test.jade', {
            getReq: getReq
        });

    });

    app.get('/', function (req, res) {

        var getReq = req.query['q'];
        console.log(getReq);

        res.render('index.jade', {
            getReq: getReq
        });

    });

    // File called
    app.get('/:file', function (req, res) {
        //TODO q doesn't work on / ONLY index
        var file = req.params.file;
        var getReq = '', idReq = '';
        res.render(file + ".jade", {
            getReq: getReq
        }, function (err, result) {
            if (err) notFound(res);
            else res.send(result); // send rendered HTML back to client
        });
    });

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
    app.get('/*', function(req, res){
    	res.sendFile(appRoot + '/views/index.html');
    	console.log('Input matches: /*');
    });

    app.get('*', function(req, res) {
    	res.sendFile(appRoot + '/views/index.html');
    	console.log('Input matches: *');
    });
};
