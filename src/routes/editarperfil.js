const express = require('express')
const router = express.Router();

const { authGuestMiddleware, authMiddleware } = require('../middlewares/auth');


router.get('/editarperfil', (req, res) => {
    res.render('editarperfil')

});



module.exports = router;
    