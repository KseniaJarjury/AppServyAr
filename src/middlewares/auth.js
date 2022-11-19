//const classUser = require('../models/users');

const authMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        // res.sendStatus(401);
        res.redirect('/auth/login');
    }
};
const authGuestMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        res.redirect('/home');
    } else {
        next();
    }
};

const authUserMiddleware = async (req, res, next) => {
    if (req.session && req.session.user) {
        let userLoggedId = req.session.user;
        if (userLoggedId) {
            let userLogged = await classUser.find(userLoggedId);
            res.locals.userLogged = userLogged;
        }
    }
    next();
}

module.exports = {
    authMiddleware,
    authGuestMiddleware,
    authUserMiddleware,
};
