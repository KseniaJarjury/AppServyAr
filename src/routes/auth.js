const express = require('express');
const router = express.Router();
// const passport = require('passport');

//SIGNUP
router.get('/login', (req, res) => {
  res.render('login');
});
// router.post('/login', passport.authenticate('local.signup', {
//         successRedirect: '/index',
//         failureRedirect: '/login',
//         failureFlash: true
// }));



module.exports = router;
