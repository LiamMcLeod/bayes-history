//REDUNDANT
module.exports = function (app) {
  var mod = require('../modules/routeModules');

  // Misc Errors
  app.get('/500', function (req, res) {
    mod.error(req, res, err);
  });

  // Catch 404
  app.use(function (req, res) {
    mod.error(req, res, err);
  });

  //Catch Wildcards
  app.get('/*', function (req, res) {
      mod.error(req, res, err);
  });

  app.get('*', function (req, res) {
    if (err){
      mod.error(req, res, err);
    }
    else {
      mod.error(req, res)
    }
  });
};
