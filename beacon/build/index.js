"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var hostname = '127.0.0.1';
var port = 3000;
var server = function (req, res) {
    res.write('Hello World!'); //write a response
    res.end(); //end the response);
};
var app = http_1.default.createServer(server);
// const io = socket(app)
app.listen(80);
/*
io.on('connection', function (socket: any) {
  console.log('a user connected');
  // whenever we receive a 'message' we log it out
  socket.on('message', function (message: any) {
    console.log(message);
  });
});

*/
