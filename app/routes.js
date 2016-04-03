module.exports = function (app, pgClient) {
    /* ==========================================================
     * 			 			  App 		            		 	*
     * ========================================================== */
    var express = require('express');
    var fs = require('fs');

    // app.use(express.static(appRoot + '/views', {defaultExtension: 'jade'}));
    // app.use('/', express.static(__dirname + '/views'));

    var $;
    var userInit = require('./models/UserInit');
    /* ==========================================================
     *		 			 Back-End API						 	*
     * ========================================================== */
    global.apiRouter = express.Router();
    require('./routes/api')(app);

    app.use('/api', apiRouter);
    // app.use(subdomain('api', apiRouter));
    /* ==========================================================
     *		 			 Front-End API						 	*
     * ========================================================== */
    global.defRouter = express.Router();
    require('./routes/view')(app, userInit);
    app.use('/', defRouter);
    /* ==========================================================
     *		 			 Front-End API						 	*
     * ========================================================== */

     require('./routes/catch')(app);

};
