"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errormiddleware = function (error, req, res, next) {
    var status = error.status || 500;
    var message = error.message || 'somethinge went wrong';
    res.status(status).json({ status: status, message: message });
};
// eslint-disable-next-line prettier/prettier
exports.default = errormiddleware;
