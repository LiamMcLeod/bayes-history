var bcrypt = require('bcrypt-nodejs');
var pg = require('pg');

var client = new pg.Client(config.db.url);

client.connect()

var query = {};
var results;

var User = module.exports = {

    // Props
    userId: '',
    emailAddress: '',
    password: '',
    // Other Props
    created: '',
    otherNames: '',
    lastNames: '',
    title: '',
    data: {},

    // Methods
    hash: function (pass) {
        var salt = bcrypt.genSalt(8);
        return bcrypt.hashSync(pass, salt, null)
    },
    validate: function (pass) {
        return bcrypt.compareSync(pass, this.password);
    },

    findAll: function () {
         // .on('row', function (row) {
            //     res.push(row);
            // })
            // .on('end', function (row) {
            //     console.log(res);
            //     return res;
            // });
    },
    findOne: function (email) {
        var res = [];
        query = {
            text: 'SELECT * from "User" WHERE "EmailAddress"=$1',
            values: [email]
        };
        client.query(query, function (err, result) {
           if (err) return console.error('error running query', err);
            return(result.rows[0]);
        });
    },

    findbyId: function (id) {
        query = {
            text: 'SELECT * FROM "User" WHERE "UserId"=$1',
            values: [id]
        };
        client.query(query, function (err, row) {
            if (err) throw err;

        });
        return;
    },

    find: function (where, op, what) {
        query = {
            text: 'SELECT * FROM "User" WHERE $1 $2 $3',
            values: [where, op, what]
        };
        client.query(query, function (err, row) {
            if (err) throw err;

        });
        return;
    }
};