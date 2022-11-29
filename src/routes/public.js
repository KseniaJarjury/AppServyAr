const express = require('express');
const User = require('../models/users');
const router = express.Router();
const modelServicio = require('../models/servicios');

// const { authGuestMiddleware, authMiddleware } = require('../middlewares/auth');
// router.get('/', (req, res) => {
//   res.render('index');
// });

router.get('/registro', (req, res) => {
    res.render('registro');
  });
router.post('/registro', async (req, res) => {
  let usuario
  let errors = validarRegistro(req.body);
  if (Object.keys(errors).length > 0) {
    req.flash('danger', "Existen varios errores de validación, corrigelos e intenta nuevamente");
    req.flash('errors', errors);
    req.flash('oldData', req.body);
    res.redirect('/registro');
  } else {
    let user = new User(req.body);
    await user.create();
    req.session.user = user;
    req.flash('success', 'El usuario ha sido creado exitosamente');
    let message = 'Registro creado con id ' + user.id + ' se ha creado correctamente';      
    res.render('dashboard', {
          errors: {},
          oldData: {},
          message: message,
          user: user
    });
  }
});

router.get('/', async (req, res) => {
  let servicios = await modelServicio.getAll();
  let user;
  if(req.session.user){
      user  = req.session.user;
  }
  res.render('index', {
      categorias: servicios,
      user: user
  });
});

router.get('/categoria', async (req, res) => {
  const servicio = await modelServicio.find(req.params.idServicio);
  res.render('categoria', {
    categoria: 0,
});
});

router.get('/categoria/:idServicio', async (req, res) => {
  const servicio = await modelServicio.find(req.params.idServicio);
  res.render('categoria', {
      categoria: servicio,
  });
});


let validarRegistro = ({usuario, email, password}) => {
  let errors = {};
  errors['usuario'] = [];
  errors['email'] = [];
  errors['password'] = [];
  
  if (!usuario) {
      errors['usuario'].push('El campo usuario es obligatorio');
  }
  if (usuario.length < 6) {
      errors['usuario'].push('El campo nombre debe tener al menos 3 letras por palabra');
  }
 
  if (!password) {
      errors['password'].push('El campo password es obligatorio');
  }
  if (password.length<8) {
      errors['password'].push('La contraseña debe tener 8 caracteres');
  }
  
  for (let key of Object.keys(errors)) {
      if (errors[key].length==0) {
          delete errors[key];
      }
  }
  return errors;
}

module.exports = router;
    