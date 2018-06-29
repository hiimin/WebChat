var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('signup', { title: 'Signup' });
});


module.exports = router;
