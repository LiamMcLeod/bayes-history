module.exports = function () {


    var bcrypt = require('bcrypt-nodejs');
    var pg = require('pg');


    var User = {
        // Props
        userId: '',
        emailAddress: '',
        password: '',
        // Other Props
        created: '',
        otherNames: '',
        lastNames: '',
        title: '',

        parameter: '',
        // Methods
        hash: function (pass) {
            var salt = bcrypt.genSalt(8);
            return bcrypt.hashSync(pass, salt, null)
        },
        validate: function (pass) {
            return bcrypt.compareSync(pass, this.password);
        },

        findOne: function () {

        },

        findbyId: function () {

        },

        findAll: function (res, req) {

            pgClient.query('SELECT * FROM Users"', function (err, rows) {
                if (err) throw err;
                res.send(rows);
            });
        }
    }
};