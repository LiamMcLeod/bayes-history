require('./User');
exports = function () {

    function getParams() {
        var o = {};
        o.email = req.body.params.username;
        o.pass = req.body.params.password;
        return o;
    }

    function checkParams(o) {

        var res = User.findOne(o.email);
        console.log(res);

    }


};