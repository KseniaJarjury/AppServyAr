// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const db = require('../config/db');
// const helpers = require('./helpers');

// // passport.use('local.signin', new LocalStrategy({
// //   usernameField: 'username',
// //   passwordField: 'password',
// //   passReqToCallback: true
// // }, async (req, username, password, done) => {
// //   const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
// //   if (rows.length > 0) {
// //     const user = rows[0];
// //     const validPassword = await helpers.matchPassword(password, user.password)
// //     if (validPassword) {
// //       done(null, user, req.flash('success', 'Welcome ' + user.username));
// //     } else {
// //       done(null, false, req.flash('message', 'Incorrect Password'));
// //     }
// //   } else {
// //     return done(null, false, req.flash('message', 'The Username does not exists.'));
// //   }
// // }));

// passport.use('local.signup', new LocalStrategy({
//     usernameField: 'usuario',
//     passwordField: 'password',
//     emailField: 'email',
//     passReqToCallback: true
// }, async (req, usuario, email, password, done) => {
//     let newusuario = {
//         usuario,
//         email,
//         password
//     };
//     newusuario.password = await helpers.encryptPassword(password);
//     // Saving in the Database
//     const result = await db.query('INSERT INTO usuario SET ? ', newusuario);
//     newusuario.id = result.insertId;
//     return done(null, newusuario);
// }));

// passport.serializeUser((usuario, done) => {
//   done(null, usuario.id);
// });

// passport.deserializeUser(async (id, done) => {
//   const rows = await db.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
//   done(null, rows[0]);
// });

