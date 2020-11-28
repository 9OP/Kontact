"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth = function (socket, next) {
    var token = socket.handshake.auth;
    // ...
    console.log('AuthnToken: ', token);
    next();
};
exports.default = auth;
// // in a middleware
// io.use(async (socket, next) => {
//   try {
//     const user = await fetchUser(socket);
//     socket.user = user;
//   } catch (e) {
//     next(new Error("unknown user"));
//   }
// });
