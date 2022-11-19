const express = require('express')
const router = express.Router();

const { authGuestMiddleware, authMiddleware } = require('../middlewares/auth');


router.get('/formcontratacion', (req, res) => {
    res.render('formcontratacion')
});



module.exports = router;
    