const express = require('express')
const router = express.Router();

const { authGuestMiddleware, authMiddleware } = require('../middlewares/auth');


router.get('/contratooferente', (req, res) => {
    res.render('contratooferente')

});



module.exports = router;
    