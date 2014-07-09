/**
 * Created by sergey on 04.07.2014.
 */
var log=require('libs/log')(module);
var config=require('config');
var connect=require('connect');
var async=require('async');
var cookie=require('cookie');
var cookieParser = require('cookie-parser');
var sessionStore=require('libs/sessionStore');
var HttpError=require('error').HttpError;
var User=require('models/user').User;






module.exports=function(server) {

  //  var serverM=new mongoDb.Server('local')



    var io = require('socket.io').listen(server);
    io.set('origins', 'localhost:*');
    io.set('logger', log);



    io.sockets.on('connection', function(socket) {

        var  usColl;
        User.find({},function(err,docs){
            if(err) return err;
            else{

                usColl=docs;
            }
        });


        var usernameMain;
        socket.on('message', function(username,text, cb) {
            socket.broadcast.emit('message', username, text);
            cb && cb();
        });
        socket.on('disconnect', function() {

            socket.broadcast.emit('leave', usernameMain);
        });
        socket.on('conn', function(username,cb) {
            usernameMain=username;
            socket.broadcast.emit('join', username);
            cb && cb();
            //development add module with color


        });

       socket.on('loadAllUser', function(username,cb) {



           socket.emit('getAllUser',   usColl);
           //enter this

           cb && cb();
          // socket.broadcast.emit('youAlive');
        });
       /* socket.on('iAlive',function(username){
           socket.broadcast.emit('aliveUserCall',username);
        });

        /*   socket.on('disconnect', function() {
               socket.broadcast.emit('leave', username);
           });*/

    });
    return io;
};