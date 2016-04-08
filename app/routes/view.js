var mod = require('../modules/routeModules');
var lib = require('../modules/lib');
var User = require('../models/User');

module.exports = function (express) {
    // test pages
    var appRouter = express.Router();

    appRouter.get('/', function (req, res) {
        var $ = req.session;
        res.render("index", {session: $, bg: lib.rnd()}, function (err, result) {
            if (err) mod.error(req, res, err);
            else res.send(result); // send rendered HTML back to client
        });

    });

    appRouter.get('/test', function (req, res) {
        var getReq = '';
        if (req.query['q'] != undefined) {
            getReq = req.query['q'];
            console.log(getReq);
        }
        console.log(req.session);

        res.render('test', {
            session: req.session
        });
    });
    appRouter.get('/sess', function (req, res) {
        var $ = req.session;
        var user = new User();
        if (req.query) {
            var o = req.query;
            var x = user.hash(o);
        }
        if ($.views) {
            $.views++;
            res.setHeader('Content-Type', 'text/html');
            res.write(x);
            res.write('<p>views: ' + $.views + '</p>');
            res.write('<p>expires in: ' + ($.cookie.maxAge / 1000) + 's</p>');
            res.end()
        } else {
            $.views = 1;
            res.end('welcome to the session demo. refresh!')
        }
    });
    appRouter.get('', function (req, res) {
        var $ = req.session;
        res.render("index", {session: $, bg: lib.rnd()}, function (err, result) {
            if (err) mod.error(req, res, err);
            else res.send(result); // send rendered HTML back to client
        });

    });

    // File called
    appRouter.get('/:file', function (req, res) {
        // if (typeof req.session.loggedIn === undefined) {
        //     req.session.loggedIn=false;
        // }
        var file = req.params.file;

        var $ = req.session;

        // userData.Created = userData.Created.toString();
        $.user.Created = $.user.Created.substring(4, 15);
        // userData.DateOfBirth = userData.DateOfBirth.toString();
        $.user.DateOfBirth = $.user.DateOfBirth.substring(4, 15);
        // console.log($.loggedIn);

        if ($.loggedIn) {
            res.render(file, {
                bg: lib.rnd(),
                session: $,
                status: $.status,
                loggedIn: $.loggedIn,
                userId: $.user.UserId,
                username: $.user.Username,
                title: $.user.Title,
                firstName: $.user.FirstName,
                lastName: $.user.LastName,
                emailAddress: $.user.EmailAddress,
                doB: $.user.DateOfBirth,
                created: $.user.Created,
                role: $.user.Role
            }, function (err, result) {
                if (err) mod.error(req, res, err);
                else res.send(result)

            });
        }
        else {
            res.render(file, {
                bg: lib.rnd(),
                status: $.status,
                loggedIn: $.loggedIn
            }, function (err, result) {
                if (err) mod.error(req, res, err);
                else res.send(result)
            });
        }
    });

    return appRouter;
};
