module.exports = function (express, client) {

    /* ==========================================================
     *		 			 Back-End API						 	*
     * ========================================================== */
      // /https://github.com/stribny/auth-quickstart/blob/master/app/routers/appRouter.js
  // https://github.com/stribny/auth-quickstart
  //http://yifeed.com/passportjs-mysql-expressjs-authentication.html
     // https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
    // https://devdactic.com/restful-api-user-authentication-1/

    var apiRouter = require('./routes/api')(express, client);

    /* ==========================================================
     *		 			 Front-End API						 	*
     * ========================================================== */
    var appRouter = require('./routes/view')(express, client);
};
