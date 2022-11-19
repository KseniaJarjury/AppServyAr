const express = require('express')
const router = express.Router();

const { authGuestMiddleware, authMiddleware } = require('../middlewares/auth');


router.get('/perfiloferente', (req, res) => {
    res.render('perfiloferente')
});



module.exports = router;
    