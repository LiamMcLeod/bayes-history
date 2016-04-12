var mod = require('../modules/routeModules');
var lib = require('../modules/lib');
var User = require('../models/User');

module.exports = function (express) {
    // test pages
    var appRouter = express.Router();

    /*
     * GET
     * '/'
     * Deliver's index with random background
     * TODO Parse session data into index
     */
    appRouter.get('/', function (req, res) {
        var $ = req.session;
        res.render("index", {session: $, bg: lib.rnd()}, function (err, result) {
            if (err) mod.error(req, res, err);
            else res.send(result); // send rendered HTML back to client
        });

    });

    /*
     * GET
     * '/test'
     * Page used to rest random crap
     */
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
    /*
     * GET
     * '/sess'
     * Session data test page
     */
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

    /*
     * GET
     * ''
     * Catch blank
     */
    appRouter.get('', function (req, res) {
        var $ = req.session;
        res.render("index", {session: $, bg: lib.rnd()}, function (err, result) {
            if (err) mod.error(req, res, err);
            else res.send(result); // send rendered HTML back to client
        });

    });

    /*
     * GET
     * '/u/'+username
     * User profile page
     * //TODO generate from restful api
     */
    appRouter.get('/u/:id', function (req, res) {
        var o = {};
        o.user = req.params.id;
        var $ = req.session;

        if (o.user && $.loggedIn) {
            var user = new User();
            user.findUser(o, function (err, user) {
                delete user.password;
                req.session.profile = user;
                mod.renderProfile(req, res);
            });
        }
        else if (!o.user && $.loggedIn) {
            req.session.profile = req.session.user;
            mod.renderProfile(req, res);
        }
        else {
            res.render('profile', {
                bg: lib.rnd(),
                status: $.status,
                loggedIn: $.loggedIn
            }, function (err, result) {
                if (err) mod.error(req, res, err);
                else res.send(result)
            });
        }
    });

    /*
     * GET
     * '/'+file
     * Deliver file or 404
     */
    appRouter.get('/:file', function (req, res) {
        // if (typeof req.session.loggedIn === undefined) {
        //     req.session.loggedIn=false;
        // }
        var file = req.params.file;
        var $ = req.session;

        if ($.user) {
            if ($.user.Created.contains('T')) {
                $.user.Created = $.user.Created.substring(4, 15);
                // console.log($.user.Created);
            }
            if ($.user.DateOfBirth.contains('T')) {
                $.user.DateOfBirth = $.user.DateOfBirth.substring(4, 15);
                // console.log($.user.DateOfBirth);
            }
        }

        if ($.loggedIn) {
            mod.renderLoggedIn(req, res, file);
        }
        else {
            mod.renderLoggedOut(req, res, file);
        }
    });

    return appRouter;
}
;
