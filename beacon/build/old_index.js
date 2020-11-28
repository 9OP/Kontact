"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var auth_1 = __importDefault(require("./auth"));
var httpServer = http_1.createServer();
var io = new socket_io_1.Server({
    cors: {
        origin: '*',
    },
});
io.listen(httpServer);
var cpt = 0;
// Authentication
io.use(auth_1.default);
io.on('connection', function (socket) {
    socket.emit('welcome', 'welcome man');
    // console.log('SocketId: ', socket.id);
    // console.log('SocketHandshake: ', socket.handshake);
    socket.join('channel-0');
    console.log('Channels: ', socket.rooms);
    socket.on('message', function () {
        console.log('message');
        cpt += 1;
        socket.emit('hello', cpt);
    });
    socket.on('JOIN_CHANNEL', function (channel) {
        console.log(channel);
        socket.join("channel-" + channel);
        console.log('Channels: ', socket.rooms);
        socket.emit('JOIN_CHANNEL_SUCCESS');
    });
});
httpServer.listen(3000);
// const server = require('https').createServer({
//   key: fs.readFileSync('/tmp/key.pem'),
//   cert: fs.readFileSync('/tmp/cert.pem')
// });
