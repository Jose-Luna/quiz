exports.loginRequired = function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

exports.new = function (req, res) {
    var errors = req.session.errors || {};
    req.session.errors = {};

    res.render('sessions/new', {
        errors: errors
    });
};

exports.create = function (req, res) {

    var login = req.body.login;
    var password = req.body.password;

    var userController = require('./user_controller');
    userController.autenticar(login, password, function (error, user) {
        if (error) {
            req.session.errors = [{
                "message": 'Error: ' + error
                    }];
            res.redirect("/login");
            return;
        }

        req.session.user = {
            id: user.id,
            username: user.username
        };

        res.redirect(req.session.redir.toString());
    });


};

exports.destroy = function (req, res) {
    if(req.session.user){
        //console.log("Cerrando sesión de: " + req.session.user.username + " por logout");
        delete req.session.user;
        req.session.user = null;
        req.session.anterior = null;                

    }
    res.redirect(req.session.redir.toString());
}