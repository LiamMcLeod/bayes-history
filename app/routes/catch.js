module.exports = function (app) {
    var mod = require('../modules/routeModules');
    // Misc Errors
    app.get('/500', function (req, res) {
        mod.notFound(res);
    });

    // Catch 404
    app.use(function (req, res) {
        mod.notFound(res);
    });

    //Catch Wildcards
    app.get('/*', function (req, res) {
        // mod.notFound(res);
        res.sendFile(appRoot + '/views/index.html');
        console.log('Input matches: /*');
    });

    app.get('*', function (req, res) {
        // mod.notFound(res);
        res.sendFile(appRoot + '/views/index.html');
        console.log('Input matches: *');
    });
};