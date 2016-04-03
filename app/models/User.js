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

        find : function () {
            
        }

        findOne: function () {

        },

        findbyId: function (what) {
          var query = {
            text: 'SELECT * FROM "Users" WHERE "UserId"=$1',
             values: [what]
          }
        },

        findAll: function (res, req, comp, where, what) {
          var query = {
            text: 'SELECT * FROM "Users" WHERE $1 $2 $3',
	           values: [where, comp, what]
          }
            pgClient.query('SELECT * FROM Users WHERE"', function (err, rows) {
                if (err) throw err;
                res.send(rows);
            });
        }
    }
};
