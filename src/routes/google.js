const passport = require ('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const dotenv = require('dotenv');
const express = require('express')
const router = express.Router();
dotenv.config();

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/login/google",
    passReqToCallback : true
  },
  function(request, accessToken, refreshToken, profile, done)  {
      return done(err, profile);
    }
  
));
passport.serializeUser(function(user,done){
    done(null,user);
});
passport.deserializeUser(function(user,done){
    done(null,user);
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function (req, res) {
    // Successful authentication, redirect success.
    res.redirect('/');
});