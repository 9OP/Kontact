"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveMessage = exports.sendMessage = void 0;
var joi_1 = __importDefault(require("joi"));
var helper_1 = require("./helper");
exports.sendMessage = helper_1.createEvent('message:send', {
    message: joi_1.default.string().required().description('The content of the message'),
    to: joi_1.default.string().optional().description('The name of the user to send the message'),
}, function (socket, _a) {
    var message = _a.message, to = _a.to;
    // Insert your logic here
    console.log('message: ', message);
    console.log('socketId: ', socket.id);
});
exports.receiveMessage = 0;
