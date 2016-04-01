module.exports = function (app) {
    var rModules = require('../modules/routeModules');
    // Misc Errors
    app.get('/500', function (req, res) {
        rModules.notFound(res);
    });

    // Catch 404
    app.use(function (req, res) {
        rModules.notFound(res);
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