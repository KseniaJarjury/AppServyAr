const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../config/db');
const helpers = require('../middlewares/helpers');


passport.use('local.signup', new LocalStrategy({
    usernameField: 'usuario',
    emailField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, usuario, email, password, done) => {
    let newusuario = {
        usuario,
        email,
        password
    };
    newusuario.password = await helpers.encryptPassword(password);
    // Saving in the Database
    const result = await db.query('INSERT INTO usuario SET ? ', newusuario);
    newusuario.id = result.insertId;
    return done(null, newusuario);
}));

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await db.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
  done(null, rows[0]);
});

// const connection = require('../config/db')

// class UsuarioRegistro {
//     constructor(data) {
//         this.id = data.id;
//         this.usuario = data.usuario;
//         this.email = data.email;
//         this.password = data.password;
//     }
//     async create() {
//         let queryStr = 'INSERT INTO `usuario` (`usuario`, `email`, `password`) VALUES (?,?,?)';
//         let result, fields;
//         [result, fields] = await connection.query(
//             queryStr,
//             [this.nombre, this.mail, this.edad, this.autorizado],
//         );
//         return result.insertId;
//     }
// }


// module.exports = UsuarioRegistro;