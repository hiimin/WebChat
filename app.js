var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session'); //세션
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');  //post 방식 전송을 위해서 필요
var bcrypt = require('bcrypt-nodejs');  //암호화

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var testRouter = require('./routes/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));   //미들웨어 등록부분

app.use(session({   //router 위에 있어야됨(이유..?)
    key: 'sid',
    secret: 'dl123wjd098als567',
    resave: false,  //resave 세션아이디를 접속할때마다 발깁하지 않는다
    saveUninitialized: true,
    cookie: {
        maxAge: 24000*60*60 //쿠키 유효시간 24시간
    }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/signup',signupRouter);
app.use('/test',testRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(200,function () {
    console.log('Connected 3000 port');
});

module.exports = app;
