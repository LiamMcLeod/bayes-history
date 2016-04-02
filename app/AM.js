/* establish the database connection */

var bcrypt = require('bcrypt-nodejs');

var Sequelise = require('sequelize');
var sequelise = new Sequelise();

var db = new pgClient(config.db.url);


var accounts = require('.models/User');

/* login validation methods */

exports.autoLogin = function (user, pass, callback) {
    accounts.findAll({user: user}, function (e, o) {
        if (o) {
            o.pass == pass ? callback(o) : callback(null);
        } else {
            callback(null);
        }
    });
};

exports.manualLogin = function (user, pass, callback) {
    accounts.findAll({user: user}, function (e, o) {
        if (o == null) {
            callback('user-not-found');
        } else {
            validatePassword(pass, o.pass, function (err, res) {
                if (res) {
                    callback(null, o);
                } else {
                    callback('invalid-password');
                }
            });
        }
    });
};

/* record insertion, update & deletion methods */

exports.addNewAccount = function (newData, callback) {
    accounts.findAll({user: newData.user}, function (e, o) {
        if (o) {
            callback('username-taken');
        } else {
            accounts.findAll({email: newData.email}, function (e, o) {
                if (o) {
                    callback('email-taken');
                } else {
                    saltAndHash(newData.pass, function (hash) {
                        newData.pass = hash;
                        // append date stamp when record was created //
                        newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
                        accounts.insert(newData, {safe: true}, callback);
                    });
                }
            });
        }
    });
};

exports.updateAccount = function (newData, callback) {
    accounts.findAll({_id: getObjectId(newData.id)}, function (e, o) {
        o.name = newData.name;
        o.email = newData.email;
        o.country = newData.country;
        if (newData.pass == '') {
            accounts.save(o, {safe: true}, function (e) {
                if (e) callback(e);
                else callback(null, o);
            });
        } else {
            saltAndHash(newData.pass, function (hash) {
                o.pass = hash;
                accounts.save(o, {safe: true}, function (e) {
                    if (e) callback(e);
                    else callback(null, o);
                });
            });
        }
    });
};

exports.updatePassword = function (email, newPass, callback) {
    accounts.findAll({email: email}, function (e, o) {
        if (e) {
            callback(e, null);
        } else {
            saltAndHash(newPass, function (hash) {
                o.pass = hash;
                accounts.save(o, {safe: true}, callback);
            });
        }
    });
};

/* account lookup methods */

exports.deleteAccount = function (id, callback) {
    accounts.remove({_id: getObjectId(id)}, callback);
};

exports.getAccountByEmail = function (email, callback) {
    accounts.findAll({email: email}, function (e, o) {
        callback(o);
    });
};

exports.validateResetLink = function (email, passHash, callback) {
    accounts.find({$and: [{email: email, pass: passHash}]}, function (e, o) {
        callback(o ? 'ok' : null);
    });
};

exports.getAllRecords = function (callback) {
    accounts.find().toArray(
        function (e, res) {
            if (e) callback(e);
            else callback(null, res)
        });
};

exports.delAllRecords = function (callback) {
    accounts.remove({}, callback); // reset accounts collection for testing //
};

/* private encryption & validation methods */

var generateSalt = function () {
    return bcrypt.genSaltSync(4);
};

var crypt = function (str) {
    return bcrypt.hashSync(str, salt);
};

var saltAndHash = function (pass, callback) {
    var salt = generateSalt();
    callback(salt + bcrypt(pass + salt));
};

var validatePassword = function (plainPass, hashedPass, callback) {
    var salt = hashedPass.substr(0, 10); // 29
    var validHash = salt + crypt(plainPass + salt);
    callback(null, hashedPass === validHash);
};

var getObjectId = function (id) {
    return new require('mongodb').ObjectID(id);
};

var findById = function (id, callback) {
    accounts.findAll({_id: getObjectId(id)},
        function (e, res) {
            if (e) callback(e);
            else callback(null, res)
        });
};

var findByMultipleFields = function (a, callback) {
// this takes an array of name/val pairs to search against {fieldName : 'value'} //
    accounts.find({$or: a}).toArray(
        function (e, results) {
            if (e) callback(e);
            else callback(null, results)
        });
};
/**
 * Created by dual1ty on 02/04/2016.
 */
