const express = require('express')
const router = express.Router();

const { authGuestMiddleware, authMiddleware } = require('../middlewares/auth');


router.get('/registro', (req, res) => {
    res.render('registro')

});



module.exports = router;
    