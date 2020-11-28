"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindEvent = exports.createEvent = void 0;
var Joi = __importStar(require("joi"));
function assert(condition, message) {
    if (!condition) {
        var mess = message || 'Assertion failed';
        throw new Error(mess);
    }
}
/**
   * Create an event to be implemented into sockets
   * @param {String} name - The name of the event
   * @param {object} rules - Object containing Joi validation rules
   * @param {Function} fn - The function to be called on event
   * @returns {*} The event Object
   */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var createEvent = function (name, rules, fn) {
    assert(!!name, 'helpers - socket.createEvent() must have a name');
    assert(typeof fn === 'function', 'helpers - socket.createEvent() must have a function');
    return {
        name: name,
        fn: fn,
        validation: rules && Joi.object().keys(rules),
    };
};
exports.createEvent = createEvent;
/**
   * Bind an event to a socket
   * @param {String} name - The name of the event
   * @param {any} validation - A Joi object validation
   * @param {Function} fn - The function to be called on event
   */
var bindEvent = function (socket, _a) {
    var name = _a.name, validation = _a.validation, fn = _a.fn;
    socket.on(name, function (payload) {
        // Validate
        if (payload === void 0) { payload = {}; }
        if (validation) {
            //   Joi.validateAsync(payload, validation, (error: any) => {
            //     if (error) {
            //       return socket.emit(name, { error });
            //     }
            //     fn(socket, payload);
            //   });
            validation.validateAsync(payload).then(function (val) {
                console.log('pass validation: ', val);
            }).catch(function (err) { return socket.emit(name, { err: err }); });
            // throw new Error(`Failed to validate input ${err.details[0].message}`);
        }
        return fn(socket, payload);
    });
};
exports.bindEvent = bindEvent;
