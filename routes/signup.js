var express = require('express');
var router = express.Router();
var connection = require('../public/javascripts/dbconnection');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('signup', { title: 'Signup' });
});

router.post('/',function (req,res,next) {
    var name = req.body.name;
    var nickname = req.body.nickname;
    var id = req.body.id;
    var password = req.body.password;
    var confirmPW = req.body.confirmPW;

    var sql = 'INSERT INTO users (id, password, name, nickname) VALUES(?, ? ,? ,?)';
    var parms = [id,password,name,nickname];
    if(password!=confirmPW){
        console.log('비밀 번호를 다시 입력하시오');
        res.redirect('/signup');
    } else {
        connection.query(sql, parms, function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                console.log(rows.insertId);
                res.redirect('/login');
            }
        });
    }
});


module.exports = router;
