const express = require('express');
const router = express.Router();

// const { authGuestMiddleware, authMiddleware } = require('../middlewares/auth');

const modelServicio = require('../models/servicios');
const { checkLogin } = require('../models/users');

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


router.get('/categorias/:idServicio', async (req, res) => {
    const servicio = await modelServicio.find(req.params.idServicio);
    res.render('categoria', {
        categoria: servicio,
    });
});


module.exports = router;
