const classUser = require('../models/users');

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};
const authMiddleware = (req, res, next) => {
    if (req.session && req.session.passport) {
        next();
    } else {
        // res.sendStatus(401);
        res.redirect('/login');
    }
};
const authGuestMiddleware = (req, res, next) => {
    if (req.session && req.session.passport) {
        res.redirect('/');
    } else {
        next();
    }
};

const authUserMiddleware = async (req, res, next) => {
    if (req.session && req.session.passport) {
            let userLogged = await classUser.findByEmail(req.session.passport.user.email);
            res.locals.userLogged = userLogged;
        }
    next();
}

module.exports = {
    isAuthenticated,
    authMiddleware,
    authGuestMiddleware,
    authUserMiddleware,
};
