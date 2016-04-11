var bcrypt = require('bcrypt-nodejs');
var pg = require('pg');

var client = new pg.Client(config.db.url);

client.connect()

var query = {};
var results;

var User = module.exports = {

    // Props
    userId: -1,
    emailAddress: '',
    password: '',
    // Other Props
    created: '',
    otherNames: '',
    lastName: '',
    title: '',


    // Methods
    hash: function (pass) {
        var salt = bcrypt.genSaltSync(8);
        return bcrypt.hashSync(pass, salt)
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
        var q = client.query(query);
        q.on('error', function (err) {
            if (err) console.error(err);
        });
        q.on('row', function (row, result) {
            result.addRow(row);
        });
        q.on('end', function (result) {
            console.log(result.rows.length + ' rows were received');
            if (!result) {
                console.log("fuck");
                return false;
            }
            else {
                // console.log(result.rows[0].UserId);
                this.userId = result.rows[0].UserId;
                this.emailAddress = result.rows[0].EmailAddresults;
                this.password = result.rows[0].Password;
                this.created = result.rows[0].Created;
                this.otherNames = result.rows[0].OtherNames;
                this.lastName = result.rows[0].LastName;
                this.title = result.rows[0].Title;
                return true;
            }
        });
        console.log(this.userId);
        // if (this.userId !=-1) return true;
        // else return false;
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