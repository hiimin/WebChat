var express = require('express');
var router = express.Router();
var connection = require('../public/javascripts/dbconnection');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

router.post('/',function (req,res,next) {
    let {userID} = req.body;
    var userPassword = req.body.userPassword;

    connection.query('select *from users where id = ?',userID, function (err,result) {
        if(err){
            console.log('err :'+err);
        }else{
            if(result.length ==0) {
                res.json({success: false, msg: '해당 유저가 존재하지 않습니다.'})
            }else{
                if(userPassword!=result[0].password) {
                    res.json({success: false, mag: '비밀번호가 일치하지 않습니다.'})
                }else{
                    res.json({success:true})
                }
            }
        }
    })
})

module.exports = router;
