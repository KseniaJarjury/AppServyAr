const express = require('express')
const router = express.Router();

const classUser = require('../models/users');
const { authGuestMiddleware, authMiddleware } = require('../middlewares/auth');

router.get('/login', authGuestMiddleware, async (req, res) => {
    res.render('login');
});

let validateLogin = (data) => {
    let errors = {
        email: [],
        password: [],
    };
    if (data.password.length<8) {
        errors.password.push('La contraseña debe tener 8 caracteres');
    }
    for (let k of Object.keys(errors)) {
        if (errors[k].length==0) {
            delete errors[k];
        }
    }
    if (Object.keys(errors).length==0) {
        return null;
    }
    return errors;
};

router.post('/login', authGuestMiddleware, async (req, res) => {
    let formData = req.body;
    let errors = validateLogin(req.body)
    if (errors) {
        req.flash('errors', errors);
        req.flash('oldData', {
        email: formData.email,
        })
        res.redirect('/');
        return;
    }
    let user = await classUser.checkLogin(formData)
    if (user) {
        req.session.user = user.id;
        res.redirect('/home');
    } else {
        req.flash('danger', 'Credenciales incorrectas');
        req.flash('oldData', {
            email: formData.email,
        })
        res.redirect('/auth/login');
    }
});

router.get('/logout', authMiddleware, (req, res) => {
    req.session.destroy();
    res.redirect('/home');
});

router.get('/register', authGuestMiddleware, (req, res) => {
    res.send('registando');
    // res.render('register');
});

module.exports = router;
