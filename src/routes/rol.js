const express = require('express')
const router = express.Router();

const { authGuestMiddleware, authMiddleware } = require('../middlewares/auth');


router.get('/rol', (req, res) => {
    res.render('rol')

});




module.exports = router;
    