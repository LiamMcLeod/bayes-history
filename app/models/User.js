var Sequelise = require('sequelize');
var sequelise = new Sequelise(config.db.url);
module.exports = sequelise.define('User', {
    userId: {
        type: Sequelise.INTEGER,
        field: "userId"
    },
    title: {
        type: Sequelise.STRING,
        field: "Title"
    },
    lastName: {
        type: Sequelise.STRING,
        field: "LastName"
    },
    otherName: {
        type: Sequelise.STRING,
        field: "OtherName"
    },
    emailAddress: {
        type: Sequelise.STRING,
        field: "EmailAddress"
    },
    password: {
        type: Sequelise.STRING,
        field: "Password"
    },
    created: {
        type: Sequelise.DATE,
        field: "Created"
    },
    dateOfBirth: {
        type: Sequelise.DATE,
        field: "DataOfBirth"
    }

});
