module.exports = function (app, pgClient) {
    /* ==========================================================
     * 			 			  App 		            		 	*
     * ========================================================== */
    var express = require('express');
    var fs = require('fs');
    var lib = require('./modules/lib');

    app.use(express.static(appRoot + '/views', {defaultExtension: 'jade'}));
    app.use('/', express.static(__dirname + '/views'));

    var $;
    var userInit = require('./models/UserInit');
    /* ==========================================================
     *		 			 Back-End API						 	*
     * ========================================================== */
    global.apiRouter = express.Router();
    require('./routes/api')(app);
    /* ==========================================================
     *		 			 Front-End API						 	*
     * ========================================================== */
    global.defRouter = express.Router();
    require('./routes/view')(app, userInit);

    /* ==========================================================
     *		 			 Front-End API						 	*
     * ========================================================== */

    require('./routes/catch')(app);

};
