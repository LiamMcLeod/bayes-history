var lib = require('./../modules/lib');
var bcrypt = require('bcrypt-nodejs');
var pg = require('pg');

function User() {
    this.UserId = -1;
    this.EmailAddress = '';
    this.Password = '';
    this.Created = '';
    this.FirstName = '';
    this.OtherName = '';
    this.LastName = '';
    this.Title = '';
    this.DateOfBirth = '';
    this.Role = '';
    this.Username = '';
}

// Methods
User.prototype.hash = function (o) {
    var salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(o.pass, salt)
};

User.prototype.validate = function (o, callback) {
    callback(bcrypt.compareSync(o.pass, User.Password));
};

User.prototype.findAll = function () {

};
User.prototype.findOne = function (o) {

};

//http://stackoverflow.com/questions/31775177/nodejs-and-mysql-wait-for-query-result
//TODO look into callbacks

User.prototype.findUser = function (o, callback) {
    var error;
    var results = [];
    var query = {};

    if (o.user.contains('.ac.uk') || o.user.contains('.co.uk') || o.user.contains('.com') && o.user.contains('@')) {
        query = {
            text: 'SELECT * from "User" WHERE "EmailAddress"=$1',
            values: [o.user.toLowerCase()]
        }
    } else {
        query = {
            text: 'SELECT * from "User" WHERE "Username"=$1 LIMIT 1',
            values: [o.user]
        };
    }

    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
        /* if Connection Callback Error */
        if (err) {
            console.log(err);
        }
        /* CLient runs query */
        var q = client.query(query, function (err, result) {
            /* Client Q has error */
            if (err) throw err;
            else return result;
        });
        /* Client Q has row */
        q.on('row', function (row, result) {
            results.push(row);
            result.addRow(row);
        });
        /* Client Q has finished */
        q.on('end', function (result) {
            done();
            var found = false;
            if (result.rows[0] != undefined) {
                setResults(result);
                found = true;
            }
            else found = false;
            callback(error, found, result.rows[0]);
        });
    });
};


setResults = function (results) {
    set("UserId", results.rows[0].UserId);
    set("EmailAddress", results.rows[0].EmailAddress);
    set("Password", results.rows[0].Password);
    set("Created", results.rows[0].Created);
    set("OtherNames", results.rows[0].OtherName);
    set("LastName", results.rows[0].LastName);
    set("Title", results.rows[0].Title);
    set("DateOfBirth", results.rows[0].DateOfBirth);
    set("Role", results.rows[0].Role);
    set("Username", results.rows[0].Username);
    set("FirstName", results.rows[0].FirstName);
};

User.prototype.getResults = function () {
    return User;
};

User.prototype.findbyId = function (id) {
    query = {
        text: 'SELECT * FROM "User" WHERE "UserId"=$1',
        values: [id]
    };
};

User.prototype.find = function (where, op, what) {
    query = {
        text: 'SELECT * FROM "User" WHERE $1 $2 $3',
        values: [where, op, what]
    };
};

function set(prop, val) {
    User[prop] = val;
}

function get(prop, val) {
    User[prop] = val;
}


module.exports = User;

// function set(prop, val) {
//     this[prop] = val;
// }
//
// function get(pop, val) {
//     this[prop] = val;
// }

// User.prototype.set = function (prop, val) {
//     this[prop] = val;
// };
// User.prototype.get = function (prop, val) {
//     return this[prop] = val;
// };

// User.userId = result.rows[0].UserId;
// User.emailAddress = result.rows[0].EmailAddress;
// User.password = result.rows[0].Password;
// User.created = result.rows[0].Created;
// User.otherNames = result.rows[0].OtherName;
// User.lastName = result.rows[0].LastName;
// User.title = result.rows[0].Title;
// User.DoB = result.rows[0].DateOfBirth;

// set("userId", results.rows[0].UserId);
// set("emailAddress", results.rows[0].EmailAddress);
// set("password", results.rows[0].Password);
// set("created", results.rows[0].Created);
// set("otherNames", results.rows[0].OtherName);
// set("lastName", results.rows[0].LastName);
// set("title", results.rows[0].Title);
// set("DoB", results.rows[0].DateOfBirth);
// set("role", results.rows[0].Role);
// set("username", results.rows[0].Username);