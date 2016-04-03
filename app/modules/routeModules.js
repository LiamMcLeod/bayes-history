var lib = require('./lib');

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
    var $ = res.session;
    res.render('404.jade', {session: $, bg:lib.rnd()});
    var err = new Error('404');
    err.status = 'Not Found';
}

function error(res) {
    res.render('error.jade');
}

function checkParams(res, req) {
    var param = {};
    param.pretty = false;
    if (req.query != null) {
        param.pretty = req.query['pretty'];
    }
    return param;
}

function returnJSON(res, results, param) {
    if (results ==[] || results == undefined || results == null) {
        return res.status(404).json({message: "Error: Not Found."});
    }
    if (param.pretty) {
        return res.send("<pre>" + JSON.stringify(results, null, 2) + "</pre>");
    }
    else return res.json(results);
}

exports.notFound = notFound;
exports.getResults = getResults;
exports.checkParams = checkParams;
exports.returnJSON = returnJSON;