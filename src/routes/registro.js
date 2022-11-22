const express = require('express')
const router = express.Router();
const passport = require('passport');
require('../models/registro');

// const { authGuestMiddleware, authMiddleware } = require('../middlewares/auth');

router.get('/registro', (req, res) => {
    res.render('registro');
  });
  router.post('/registro', passport.authenticate('local.signup', {
          successRedirect: '/index',
          failureRedirect: '/registro',
          failureFlash: true
  }));
  



module.exports = router;
    