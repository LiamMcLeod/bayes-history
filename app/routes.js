module.exports = function (app, apiRouter, pgClient) {
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

     var api = require('./routes/api')(apiRouter);


    /* ==========================================================
     *		 			 Front-End API						 	*
     * ========================================================== */
    var view = require('./routes/view')(app, userInit);

    /* ==========================================================
     *		 			 Front-End API						 	*
     * ========================================================== */

    var catchReq = require('./routes/catch')(app);

};
