//  ==================== Modules ====================
const express = require('express');
const app = express();

var authRouter = express.Router();
var openRouter = express.Router();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var session = require('express-session');

var methodOverride = require('method-override');
var favicon = require('serve-favicon');

var errorHandler = require('errorHandler');
var morgan = require('morgan');

var pg = require('pg');
var path = require('path');


if (process.env.NODE_ENV === undefined || process.env.NODE_ENV === null || process.env.NODE_ENV === '') {
    process.env.NODE_ENV = "development"; // Swap between development and college for different DBs
    app.use(errorHandler());
}
if (process.env.NODE_ENV != "college") {
    var dotenv = require('dotenv').config();
}
//  ===================== Config =====================                           // Import Configs for easy editing.
function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}
function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({error: 'Something failed!'});
    } else {
         next(err);
    }
}
function localErrorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {error: err});
}

// Application Root for absolute paths
global.appRoot = path.resolve(__dirname);

config = require('./app/config');

// ====================== DB ======================
pgClient = new pg.Client(config.db.url);
pgClient.connect(function (err) {
    if (err) {
        console.log("Database Connection Error.");
        //throw err; // Database Connection Error
    }
    else console.log("Database Connection Successful.");
});
// ======================   Body  ======================
app.use(bodyParser.json());                                         // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));     // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({extended: true}));                 // parse application/x-www-form-urlencoded
app.use(cookieParser());
app.use(session({
            secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
            proxy: true,
            resave: true,
            saveUninitialized: true,
            store: new pg.Client(config.db.url)
	    })
);

// ======================  Method ======================
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(favicon(config.dir.favicon + '/favicon.ico'));

// ======================  Logging, Debugging & Errors ======================
app.use(morgan('dev'));                                             // Log HTTP Requests
app.use(logErrors);
app.use(clientErrorHandler);
app.use(localErrorHandler);

// ======================  Dirs  ======================
app.set('view engine', 'jade');
app.use('/public', express.static(config.dir.public));
app.use('/', express.static(config.dir.views));

// ====================== Routes ======================
require('./app/routes')(app); // parse app to routes

// ====================== Listen ======================
console.log('Express listening on ' + config.port.default);
app.listen(config.port.default).on('error', function (err) {
    if (err) { // Try Alternate Port
        console.log('Error: ' + config.port.default + ' in use.');
        app.listen(config.port.alternate).on('error', function (err) {
            if (err)
                throw err;                                          // port 8080 and portAlt 3000 in use
        });
        console.log('Express listening on ' + config.port.alternate);
    }
});
console.log("App running in " + process.env.NODE_ENV + " mode");
exports = module.exports = app; 			                        // Public Exposure
//exports = module.exports = pgClient;
