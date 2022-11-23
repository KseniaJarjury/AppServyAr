const express = require('express');
const router = express.Router();

// const { authGuestMiddleware, authMiddleware } = require('../middlewares/auth');

const modelServicio = require('../models/servicios');

router.get('/', async (req, res) => {
    let servicios = await modelServicio.getAll();
    res.render('index', {
        categorias: servicios
    });
});


router.get('/categorias/:idServicio', async (req, res) => {
    const servicio = await modelServicio.find(req.params.idServicio);
    res.render('categoria', {
        categoria: servicio,
    });
});


module.exports = router;
