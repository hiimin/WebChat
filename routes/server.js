var express = require('express');
var router = express.Router();
var app = express();

//socket.io를 사용하는 경우 app를 http에 연결시키고,
//이 http를 다시 socket.io에 연결 시키는 과정 필요.
//이는 socket.io가 express를 직접 받아들이지 못하기 때문.
//socket.io는 io라는 변수명으로 서버에서 사용 됨(io는 socket.io패키지를 import한 변수)
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',function (req,res) {    //모든 request는 client.ejs를 response하도록 설정
    res.sendFile(__dirname+'client');
});

var count = 1;
//사용자가 웹사이트에 접속하게 되면 socket.io에 의해
//'connection'event가 자동으로 발생
//io.on(EVENT,함수)는 서버에 전달된 EVENT를 인식하여 함수를 실행시키는 event listener
//이때 함수에는 접속한 사용자의 socket이 parameter로 전달됨
//해당 접속자(socket)에 관련한 event들은 이 'connection'event listener 안에 작성 되어야 됨
io.on('connection',function (socket) {
    //event가 발생하면 한번만 일어나는 코드들
    console.log('user connected: ',socket.id);    //socket.id를 출력
    var name = "user"+count++;
    io.to(socket.id).emit('change name',name);  //emit => event를 발생시키는 함수
                                                //이 event는 client.ejs의 해당 event listener에서 처리됨
                                                //io.to(socket.id).emit을 사용하여 해당 socket.id에만 event를 전달

    socket.on('disconnect',function () {       //socket.io(EVENT,함수)는 해당 socket에 전달된 EVENT를 인식하여 함수를 실행 시키는 event listener
        console.log('user disconnected: ',socket.id);   //접속자의 접숙이 해제되는 경우 socket.io에 의해 'disconnect'event가 자동으로 발생
    });

    socket.on('send message', function (name,text) {
        var msg = name + ' : '+text;
        console.log(msg);
        io.emit('receive message',msg);     //'sebd message'event listener는 이 event를 받은 ㅎ
                                            //io.emit을 사용하여 모든 클라이언트들에게 event를 전달
    });
});

http.listen(3000,function () {      //app.listen이 아닌 http.listen
    console.log('server on!');
});