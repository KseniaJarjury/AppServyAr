const express = require('express')
const router = express.Router();

const { authGuestMiddleware, authMiddleware } = require('../middlewares/auth');

// const modelServicio = require('../models/contratos');

router.get('/', async (req, res) => {
    // let contratos = await modelContrato.getAll();
    let contratos = {
        "Id_contrato": 1,
        "Id_servicio": 1,
        "Id_usuario": 1,
    };
    res.render('contrato', {
        contratos: contratos,
    })
});

router.post('', async (req, res) => {
    console.log(req.body);
    res.send('generando contrato');
});




module.exports = router;
    