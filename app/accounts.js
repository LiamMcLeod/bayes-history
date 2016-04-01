var bcrypt = require('bcr');

exports.hash = function hash(pass, rounds) {
    var x = bcrypt.hashSync(pass, function (err, hash) {
        if (err) throw err;
        else {
            return hash;
        }
        // Store hash in your password DB.
    });
    return x;
};

exports.log = function (req) {
    var logStatus = req.query['log'];
    if (logStatus != undefined) {
        if (logStatus == "in") {
            var o = {};
            o.user = req.body.username;
            o.pass = req.body.password;
            // console.log(bcrypt("liammcleod", ''))
            this.login(o.user, o.pass)
        }
        else {
            req.session.destroy();
            return;
        }
    }
    else return;
    // if (req.cookies.user == undefined || req.cookies.pass == undefined) {
    //     res.render('user', {loggedIn: false});
    // }
};

exports.login = function (user, pass, callback) {
    var encPass = this.hash(pass, 4);
    console.log("boom");
    console.log(encPass);
    var qStr = {
        text: 'SELECT * FROM "User" WHERE "EmailAddress"=$1 && password=$2',
        values: [user, encPass]
    };
    var pgQ = pgClient.query(qStr, function (err, result) {
    });


    // if (o == null){
    //     callback('user-not-found');
    // }	else{
    //     validatePassword(pass, o.pass, function(err, res) {
    //         if (res){
    //             callback(null, o);
    //         }	else{
    //             callback('invalid-password');
    //         }
    //     });
    // }
    // });
};