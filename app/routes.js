module.exports = function (express, app) {
  // /https://github.com/stribny/auth-quickstart/blob/master/app/routers/appRouter.js
  // https://github.com/stribny/auth-quickstart
  //http://yifeed.com/passportjs-mysql-expressjs-authentication.html

    /* ==========================================================
     *		 			 Back-End API						 	*
     * ========================================================== */

    var apiRouter = require('./routes/api')(express);
    app.use('/api', apiRouter);

    /* ==========================================================
     *		 			 Front-End API						 	*
     * ========================================================== */
    var appRouter = require('./routes/view')(express);
    app.use('/', appRouter);

};
