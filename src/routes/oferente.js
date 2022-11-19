const express = require('express')
const router = express.Router();

const { authGuestMiddleware, authMiddleware } = require('../middlewares/auth');


router.get('/oferente', (req, res) => {
    res.render('oferente')
});


module.exports = router;
    