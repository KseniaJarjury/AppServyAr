const express = require('express')
const router = express.Router();

const { authGuestMiddleware, authMiddleware } = require('../middlewares/auth');


router.get('/cliente', (req, res) => {
    res.render('indexcliente')

});



router.get('/guest', authGuestMiddleware, (req, res) => {
    res.render('guest');
});

router.get('/home', authMiddleware, async (req, res) => {
    res.render('home');
});
module.exports = router;
    