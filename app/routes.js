module.exports = function(app) {

/* ==========================================================
* 			 			  Modules						 	*
* ========================================================== */
Array.prototype.isEmpty = function(){if(this.length===0) {return true;}else{return false;}};

var express = require('express');

app.use(express.static(appRoot + '/views', { defaultExtension: 'html' }));
app.use('/', express.static(__dirname + '/views'));


function getResults(qQuery, results, res){
	qQuery.on('row', function(row){
		results.push(row);
	});
	qQuery.on('end', function() {
		return res.json(results);
	});
}

function notFound(res){
		res.sendFile(appRoot + '/views/404.html');
		var err = new Error('404');
		err.status = 'Not Found';
}

/* ==========================================================
*		 			 Back-End API						 	*
* ========================================================== */

	/************************
	 *		Search Results	*
	 ************************/
	app.get('/api/', function(req, res) {
		var results = [];
		// var searchTerm = req.params.term;
		var param ={};
		param.pretty = false;

		if (req.query != null) {
			param.pretty = req.query['pretty'];
		}

		var qStr = {
			text: ''
			values: [vars]
		};

		var qQuery = pgClient.query(qStr,  function(err, result){} );

		qQuery.on('row', function(row, res){
			results.push(row);
		});
		qQuery.on('end', function(){

			if (results.isEmpty()){
				return res.status(404).json({ message: "Error: Not Found."});
			}
			if (param.pretty){
				return res.send("<pre>"+JSON.stringify(results, null, 2)+"</pre>");
			}
			else return res.json(results);
		})

	});

	/* ==========================================================
	*		 			 Front-End API						 	*
	* ========================================================== */

	// test pages
	app.get('/test', function(req, res){

		var getReq  = req.query['q'];
		console.log(getReq);

		res.render('tesst.jade',{
			getReq: getReq
		});

	});


		// File called
		app.get('/:file', function (req, res) {
			//TODO q doesn't work on / ONLY index
			var file = req.params.file;
			var getReq='', idReq='';
			if (file === "home" || file==="Home" || file=="index" || file==="index") {
				file = "index";
				if (req.query != []) {
					// Assign vars
				}
				res.render(file, {
					getReq: getReq
				}, function(err, result) {
					if (err) notFound(res);
					else res.send(result); // send rendered HTML back to client
				});
			}
			else {
				res.sendFile(appRoot + '/views/' + file + '.html', function (err) {
					if (err) {
						notFound(res);
					}
				});
			}
		});

// Catch
	// Misc Errors
	app.get('/500', function(req, res){
		res.sendFile(appRoot + '/views/error.html');
	});

	// Catch 404
	app.use(function(req, res) {
		res.sendFile(appRoot + '/views/404.html');
		var err = new Error('404');
		err.status = 'Not Found';
	});

	// Catch Wildcards
	app.get('/*', function(req, res){
		res.sendFile(appRoot + '/views/index.html');
		console.log('Input matches: /*');
	});

	app.get('*', function(req, res) {
		res.sendFile(appRoot + '/views/index.html');
		console.log('Input matches: *');
	});
};
