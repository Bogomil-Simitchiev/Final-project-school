function isLoggedIn() {
    return function (req, res, next) {
        if (req.session.user) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}

function isNotLoggedIn() {
    return function (req, res, next) {
        if (!req.session.user) {
            next();
        } else {
            res.redirect('/');
        }
    }
}

function isAdmin() {
    return function (req, res, next) {
        if (req.session.user.isAdmin) {
            next();
        } else {
            res.redirect('/');
        }
    }
}

function isConsultant() {
    return function (req, res, next) {
        if (req.session.user.isConsultant) {
            next();
        } else {
            res.redirect('/');
        }
    }
}


module.exports = {
    isLoggedIn,
    isNotLoggedIn,
    isAdmin,
    isConsultant
} 