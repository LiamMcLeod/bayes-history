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
function error(req, res, err) {
  // res.status(err.status || 500);
  if (err){
    var ret = {
      statusCode: 0,
      message: '',
      subtext: ''
    };
    if (err.message.contains('Failed to lookup view')) {
      ret.statusCode = 404
    }
    if (ret.statusCode === 404) {
      ret.message = "Page Not Found!";
      ret.subtext = "Sorry, but the page you were trying to view does not exist."
    }
    res.render('error', {
      statusCode: ret.statusCode,
      message: ret.message,
      status: "Error: "+ret.statusCode,
      subtext: ret.subtext,
      error: err,
      bg: lib.rnd()
    });
  }
  else {
    res.render('error', {
      statusCode: 418,
      message: "Problem with request.",
      status: "Error: 418",
      subtext: "We're sorry, but there was a problem with your request.",
      bg: lib.rnd()
    });
  }

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
  if (results == [] || results == undefined || results == null) {
    return res.status(404).json({message: "Error: Not Found."});
  }
  if (param.pretty) {
    return res.send("<pre>" + JSON.stringify(results, null, 2) + "</pre>");
  }
  else return res.json(results);
}

exports.getResults = getResults;
exports.checkParams = checkParams;
exports.returnJSON = returnJSON;
exports.error = error;
