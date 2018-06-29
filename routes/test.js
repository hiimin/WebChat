var express = require('express');
var router = express.Router();




router.post('/',(req, res, next)=>{
    let name = req.body.name;
    console.log(name);
    res.render('test',{title: 'hi test'});
})


module.exports = router;