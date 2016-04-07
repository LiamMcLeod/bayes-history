module.exports = function(app) {
	Array.prototype.isEmpty = function(){if(this.length===0) {return true;}else{return false;}};

	var express = require('express');

	app.use(express.static(appRoot + '/views', { defaultExtension: 'html' }));
	app.use('/', express.static(__dirname + '/views'));

// ===========================================================

// ====================== Back-End Routes ======================
	// API Calls
    // DEBUG STRING     console.log(req.method +" " + req.url + " from address " + req.connection.remoteAddress);


	// GET A Question

	/************************
	 *		Search Results			*
	 ************************/
	app.get('/api/search/:term', function(req, res) {
		var results = [];
		var searchTerm = req.params.term;
		var param ={};
		param.pretty = false;

		if (req.query != null) {
			param.pretty = req.query['pretty'];
		}

		var qStr = {
			text: 'SELECT "QuestionId", "QuestionNumber", "QuestionText", "ExamPaperUnit", "ExamPaperSeason", "ExamPaperDate", "ExamBoardName", "LevelTitle", "SubjectTitle" FROM "Question" INNER JOIN "ExamPaper" ON "Question"."ExamPaperId" = "ExamPaper"."ExamPaperId" INNER JOIN "ExamBoard" ON "ExamPaper"."ExamBoardId" = "ExamBoard"."ExamBoardId" INNER JOIN "Level" ON "ExamPaper"."LevelId" = "Level"."LevelId" INNER JOIN "Subject" ON "ExamPaper"."SubjectId" = "Subject"."SubjectId" WHERE "QuestionText" ~* $1 ORDER BY "QuestionNumber"',
			values: [searchTerm]
		};

		var qQuery = pgClient.query(qStr,  function(err, result){} );

		qQuery.on('row', function(row, res){
			results.push(row);
		});
		qQuery.on('end', function(){

			if (results.isEmpty()){
				//return res.status(404).json({ message: "Error: Not Found."});
			}
			if (param.pretty){
				return res.send("<pre>"+JSON.stringify(results, null, 2)+"</pre>");
			}
			else return res.json(results);
		})

	});

	/************************
	 *		Results Page			*
	 ************************/
	app.get('/api/result/:id', function(req, res) {
			var param ={};
			param.pretty = false;

			if (req.query != null) {
				param.pretty = req.query['pretty'];
			}

			var results = [];
			var result = req.params.id;
		var qStr = {
			text: 'SELECT "Question"."QuestionId", "Question"."ExaminerId", "Question"."ExamPaperId", "Topic"."TopicId", "QuestionNumber", "QuestionText", "QuestionMarks", "QuestionMarkText", "ExamPaperUnit", "ExamPaperSeason", "ExamPaperDate", "ExamBoardName", "LevelTitle", "SubjectTitle", "TopicTitle", "ExaminerNote", "QuestionImageData", "Question"."QuestionImageId" FROM "Question" INNER JOIN "ExamPaper" ON "Question"."ExamPaperId" = "ExamPaper"."ExamPaperId" INNER JOIN "ExamBoard" ON "ExamPaper"."ExamBoardId" = "ExamBoard"."ExamBoardId" INNER JOIN "Level" ON "ExamPaper"."LevelId" = "Level"."LevelId" INNER JOIN "Subject" ON "ExamPaper"."SubjectId" = "Subject"."SubjectId" INNER JOIN "Examiner" ON "Question"."ExaminerId"="Examiner"."ExaminerId" INNER JOIN "QuestionImage" ON "Question"."QuestionImageId"= "QuestionImage"."QuestionImageId" INNER JOIN "QuestionTopic" ON "Question"."QuestionId" = "QuestionTopic"."QuestionId" INNER JOIN "Topic" ON "QuestionTopic"."TopicId"= "Topic"."TopicId" WHERE "Question"."QuestionId"=$1',
			values: [result]
		};

		//TODO RESULT WONT WORK WITHOUT IMAGE

		var qQuery = pgClient.query(qStr,  function(err, result){} );

		qQuery.on('row', function(row, res){
			var b = new Buffer(row.QuestionImageData);
			row.QuestionImageData = b.toString();
			results.push(row);
		});
		qQuery.on('end', function(){
			if (results.isEmpty()){
				//return res.status(404).json({ message: "Error: Not Found."});
			}
			if (param.pretty){
				return res.send("<pre>"+JSON.stringify(results, null, 2)+"</pre>");
			}
			else return res.json(results);
		})
	});

	/************************
	 *		More From		*
	 ************************/
	app.get('/api/more/:id', function(req, res){
		var param ={};
		param.pretty = false;

		if (req.query != null) {
			param.pretty = req.query['pretty'];
			param.qId = req.query['qId'];
		}

		var results = [];
		var result = req.params.id;
		var qStr = {
			text: 'SELECT "Question"."QuestionId", "QuestionNumber", "QuestionText", "Topic"."TopicId", "Question"."ExamPaperId" FROM "Question" INNER JOIN "ExamPaper" ON "Question"."ExamPaperId"="ExamPaper"."ExamPaperId" INNER JOIN "QuestionTopic" ON "Question"."QuestionId" = "QuestionTopic"."QuestionId" INNER JOIN "Topic" ON "QuestionTopic"."TopicId"= "Topic"."TopicId" WHERE "ExamPaper"."ExamPaperId"=$1 AND "Question"."QuestionId"!=$2 ORDER BY RANDOM() LIMIT 5',
			values: [result, param.qId]
		};

		var qQuery = pgClient.query(qStr,  function(err, result){});

		qQuery.on('row', function(row, res){

			results.push(row);
		});
		qQuery.on('end', function(){
			if (results.isEmpty()){
				//return res.status(404).json({ message: "Error: Not Found."});
			}
			if (param.pretty){
				return res.send("<pre>"+JSON.stringify(results, null, 2)+"</pre>");
			}
			else return res.json(results);
		})
	});
	/************************
	 *		Questions Like		*
	 ************************/
	app.get('/api/related/:id', function(req, res){
		var param ={};
		param.pretty = false;

		if (req.query != null) {
			param.pretty = req.query['pretty'];
			param.qId = req.query['qId'];
		}

		var results = [];
		var result = req.params.id;
		var qStr = {
			text: 'SELECT "Question"."QuestionId", "QuestionNumber", "QuestionText", "Topic"."TopicId", "Question"."ExamPaperId", "ExamPaperUnit", "ExamPaperSeason", "ExamPaperDate" FROM "Question" INNER JOIN "ExamPaper" ON "Question"."ExamPaperId"="ExamPaper"."ExamPaperId" INNER JOIN "QuestionTopic" ON "Question"."QuestionId" = "QuestionTopic"."QuestionId" INNER JOIN "Topic" ON "QuestionTopic"."TopicId"= "Topic"."TopicId" WHERE "Topic"."TopicId"=$1 AND "Question"."QuestionId"!=$2 ORDER BY RANDOM() LIMIT 5',
			values: [result, param.qId]
		};
		var qQuery = pgClient.query(qStr,  function(err, result){} );

		qQuery.on('row', function(row, res){
			results.push(row);
		});
		qQuery.on('end', function(){
			if (results.isEmpty()){
				//return res.status(404).json({ message: "Error: Not Found."});
			}
			if (param.pretty){
				return res.send("<pre>"+JSON.stringify(results, null, 2)+"</pre>");
			}
			else return res.json(results);
		})
	});

	/************************
	 *		Get Image		*
	 ************************/
	app.get('/api/image/:id', function(req, res) {
		var param ={};
		param.pretty = false;

		if (req.query != null) {
			param.pretty = req.query['pretty'];
		}

		var results = [];
		var id = req.params.id;

		var qStr = {
			text: 'SELECT "QuestionId", "Question"."QuestionImageId", "QuestionImageData" FROM "Question" INNER JOIN "QuestionImage" ON "Question"."QuestionImageId"= "QuestionImage"."QuestionImageId" WHERE "QuestionId"=$1',
			values:[id]
		};

		var qQuery = pgClient.query(qStr,  function(err, result){

		});

		qQuery.on('row', function(row, res){
			var b = new Buffer(row.QuestionImageData);
			row.QuestionImageData = b.toString();
			results.push(row);
		});
		qQuery.on('end', function(){
			if (results.isEmpty()){
				//return res.status(404).json({ message: "Error: Not Found."});
			}
			if (param.pretty){
				return res.send("<pre>"+JSON.stringify(results, null, 2)+"</pre>");
			}
			else return res.json(results);
		})
	});
	/************************
	 *		Examiner Notes		*
	 ************************/
	//TODO MOD QUERY TO DISPLAY QUESTION DATA
	app.get('/api/examiner/:id', function(req, res) {
		var param = {};
		param.pretty = false;

		if (req.query != null) {
			param.pretty = req.query['pretty'];
		}

		var results = [];
		var id = req.params.id;

		var qStr = {
			text: 'SELECT "ExaminerId", "ExaminerNote", "QuestionNo" FROM "Examiner" WHERE "ExaminerId"=$1 ',
			values:[id]
		};

		var qQuery = pgClient.query(qStr,  function(err, result){

		});

		qQuery.on('row', function(row, res){
			results.push(row);
		});
		qQuery.on('end', function(){
			if (results.isEmpty()){
				//return res.status(404).json({ message: "Error: Not Found."});
			}
			if (param.pretty){
				return res.send("<pre>"+JSON.stringify(results, null, 2)+"</pre>");
			}
			else return res.json(results);
		})
	});

	/************************
	 *		Get SubjectList		*
	 ************************/
	app.get('/api/filter/subject/', function(req, res) {
		var param = {};
		var results = [];

		param.pretty = false;
		if (req.query != null) {
			param.pretty = req.query['pretty'];
		}



		var qStr = {
			text: 'SELECT * FROM "Subject"'
		};

		var qQuery = pgClient.query(qStr,  function(err, result){

		});

		qQuery.on('row', function(row, res){
			results.push(row);
		});
		qQuery.on('end', function(){
			if (results.isEmpty()){
				//return res.status(404).json({ message: "Error: Not Found."});
			}
			if (param.pretty){
				return res.send("<pre>"+JSON.stringify(results, null, 2)+"</pre>");
			}
			else return res.json(results);
		})
	});
	app.get('/api/filter/level/', function(req, res) {
		var param = {};
		var results = [];

		param.pretty = false;
		if (req.query != null) {
			param.pretty = req.query['pretty'];
		}



		var qStr = {
			text: 'SELECT * FROM "Level"'
		};

		var qQuery = pgClient.query(qStr,  function(err, result){

		});

		qQuery.on('row', function(row, res){
			results.push(row);
		});
		qQuery.on('end', function(){
			if (results.isEmpty()){
				//return res.status(404).json({ message: "Error: Not Found."});
			}
			if (param.pretty){
				return res.send("<pre>"+JSON.stringify(results, null, 2)+"</pre>");
			}
			else return res.json(results);
		})
	});
	app.get('/api/filter/examboard/', function(req, res) {
		var param = {};
		var results = [];

		param.pretty = false;
		if (req.query != null) {
			param.pretty = req.query['pretty'];
		}



		var qStr = {
			text: 'SELECT * FROM "ExamBoard"'
		};

		var qQuery = pgClient.query(qStr,  function(err, result){

		});

		qQuery.on('row', function(row, res){
			results.push(row);
		});
		qQuery.on('end', function(){
			if (results.isEmpty()){
				//return res.status(404).json({ message: "Error: Not Found."});
			}
			if (param.pretty){
				return res.send("<pre>"+JSON.stringify(results, null, 2)+"</pre>");
			}
			else return res.json(results);
		})
	});
	/************************
	 *		Upload			*
	 ************************/
	//TODO Upload PDF
	//app.post('/upload/file', function(req, res){
	//	var form = new formidable.IncomingForm();
    //
	//	form.multiples=false;
	//	form.uploadDir=('/public/files/pdf/uploaded/');
    //
	//	form.on('file', function(field, file){
    //
	//	});
    //
	//	form.on('error', function(err){
    //
	//	});
    //
	//	form.on('end', function(){
	//		res.redirect('/upload?success=true');
	//	});
    //
	//	form.parse(req);
    //
	//});
	/************************
	 *		Misc		*
	 ************************/
	// HTTP GET reqs
	//searchQuery
	//app.get('/search', function(req, res) {
	//	var searchTerm = req.query['q'];
	//	console.log('Search Query: "' + searchTerm+'"');
    //
    //
	//	return "";
	//});
	// Auth Routes
    // Functions
    function getResults(qQuery, results, res){
        qQuery.on('row', function(row){
            results.push(row);
        });
        qQuery.on('end', function() {
            return res.json(results);
        });
    }

// ====================== Front-End Routes ======================

	app.get('/debug', function(req, res){

		var getReq  = req.query['q'];
		console.log(getReq);

		res.render('debug.jade',{
			getReq: getReq
		});

	});
	// Angular Routes
	// File Routes
		// File called with no extension
		app.get('/:file', function (req, res) {
			//TODO q doesn't work on / ONLY index
			var file = req.params.file;
			var getReq='', idReq='';
			if (file === "home" || file==="Home" || file=="index" || file==="index") {
				file = "index";
				if (req.query != []) {
					getReq = req.query['q'];
				}
				res.render(file, {
					getReq: getReq
				}, function(err, result) {
					if (err) notFound(res);
					else res.send(result); // send rendered HTML back to client
				});
			}
			if (file==="result"){
				idReq = req.query['id'];
				res.render(file, {
					idReq: idReq
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

	// Catch Routes
	app.get('/log', function(req, res){
		var file = 'index';
		var logStatus = '';
		var loggedIn = false;
		logStatus = req.query['log'];

		console.log(status);
		if (logStatus === 'in'){
			console.log('in');
		}
		else { // status === 'out'
			console.log('out');
		}
		res.sendFile(appRoot + '/views/index.html');
	});

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

	function notFound(res){
			res.sendFile(appRoot + '/views/404.html');
			var err = new Error('404');
			err.status = 'Not Found';
	}

};