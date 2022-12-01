const express = require('express')
const passport = require ('passport');
const router = express.Router();
const GoogleStrategy = require( 'passport-google-oauth' ).OAuth2Strategy;
const dotenv = require('dotenv');
dotenv.config();
const classUser = require('../models/users');
const { authGuestMiddleware, authMiddleware } = require('../middlewares/auth');
const catalogo = require('./../models/catalogo');

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async function (accessToken, refreshToken, profile, done) {
    let user= await classUser.findByEmail(profile._json.email)
    if(!user){
      user = classUser.createWithGoogle({usuario:profile._json.name, email:profile._json.email, password:profile.id, urlFoto:profile._json.picture})
    }
    //req.session.user = user;
     return done(null, user);
  }
  
));
passport.serializeUser(function(user,done){
    done(null,user);
});
passport.deserializeUser(function(user,done){
    done(null,user);
});


router.get('/login', authGuestMiddleware, async (req, res) => {
    res.render('login');
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function (req, res) {
    // Redireccionando a dashboard si se autentico correctamente.
    req.session.user = req.user;
    res.redirect('/dashboard');
});
let validateLogin = (data) => {
    let errors = {
        email: [],
        password: [],
    };
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
        req.session.user = user;
        res.redirect('/dashboard');
    } else {
        req.flash('danger', 'Credenciales incorrectas');
        req.flash('oldData', {
            email: formData.email,
        })
        res.redirect('/login');
    }
});

router.get('/logout', authMiddleware, (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.get('/dashboard', (req, res) => {
    let user = req.user?req.user:req.session.user;
    res.render('dashboard', {
        user: user
    })
});

router.get('/contratooferente', (req, res) => {
    res.render('contratooferente')

});

router.get('/editarperfil', (req, res) => {
    let user = req.user?req.user:req.session.user;
    res.render('editarperfil',{
        user: user
    })

});

router.get('/formcontratacion', (req, res) => {
    res.render('formcontratacion')
});

router.get('/perfiloferente', (req, res) => {
    res.render('perfiloferente')
});

router.get('/rol', (req, res) => {
    let nuevoRol;
    let user;
    if(req.session.user.rol == "oferente"){
        nuevoRol = "cliente";
    }
    else{
        nuevoRol = "oferente";
    }
    user = classUser.updateRol(nuevoRol,req.session.user.id);
    req.session.user.rol = nuevoRol;
    res.render('dashboard',{user: req.session.user})
});

// router.get('/', async (req, res) => {
//     // let contratos = await modelContrato.getAll();
//     let contratos = {
//         "Id_contrato": 1,
//         "Id_servicio": 1,
//         "Id_usuario": 1,
//     };
//     res.render('contrato', {
//         contratos: contratos,
//     })
// });

// router.post('', async (req, res) => {
//     console.log(req.body);
//     res.send('generando contrato');
// });

// router.get('/oferente', (req, res) => {
//     res.render('oferente')
// });

// router.get('/cliente', (req, res) => {
//     res.render('indexcliente')

// });
// router.get('/register', authGuestMiddleware, (req, res) => {
//     res.send('registando');
//     // res.render('register');
// });

//////////////////////CONTRATO

const modelContrato = require('../models/contrato');

router.get('/', async (req, res) => {
     let propuesta = await modelContrato.getAll();
    // let contratos = {
    //     "Id_contrato": 1,
    //     "Id_servicio": 1,
    //     "Id_usuario": 1,
    // };
    res.render('contrato', {
        contratos: propuesta,
    })
});


router.get('/contrato/:Id_propuesta', async (req, res) => {
    const propuesta = await modelContrato.find(req.params.Id_propuesta);
    res.render('contrato', {
        contratos: propuesta,
    });
});



router.post('', async (req, res) => {
    console.log(req.body);
    res.send('generando contrato');
});


///CONT. OFERENTE

router.get('/', async (req, res) => {
    let propuesta = await modelContrato.getAll();
   // let contratos = {
   //     "Id_contrato": 1,
   //     "Id_servicio": 1,
   //     "Id_usuario": 1,
   // };
   res.render('contratooferente', {
       contratos: propuesta,
   })
});


router.get('/contrato/:Id_propuesta', async (req, res) => {
   const propuesta = await modelContrato.find(req.params.Id_propuesta);
   res.render('contratooferente', {
       contratos: propuesta,
   });
});


//////////////FIN CONTRATO

router.get('/catalogo', (req, res) => {
    // let catalogos = await catalogo.save();
    res.render('catalogo')
});
router.post('/catalogo',  async (req, res) => {
    
});


module.exports = router;
